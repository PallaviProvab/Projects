// src/flights/flights.service.ts
import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { createHmac, randomBytes } from 'crypto';
import { LogsService } from '../logs/logs.service';
import { ThirdPartyApiProvider } from 'src/Thirdparty_api/third-party-api.provider';
import { SearchFlightsDto } from 'src/dto/SearchFlights.dto';
import { FlightsFormatter } from './flights.formatter';
import { FareQuoteDto } from '../dto/fare-quote.dto';
import { CommitBookingDto } from 'src/dto/commit-booking.dto';
import { BookingResponseDto } from 'src/dto/booking-response.dto';


// Define the interface for the cached data.
export interface CachedFlightData {
  thirdPartyToken: string;
}

@Injectable()
export class FlightsService {
  constructor(
    private readonly http: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly logsService: LogsService,
    private readonly thirdPartyApi: ThirdPartyApiProvider,
    private readonly flightsFormatter: FlightsFormatter, 
  ) {}

  private generateHashedToken(supplierToken: string): string {
    const internalKey = 'my-flight-booking-project-2025';
    return createHmac('sha256', internalKey)
      .update(supplierToken)
      .digest('hex');
  }
  
  private generateAppReference(): string {
    const minLength = 15;
    const maxLength = 25;
    const buffer = randomBytes(Math.ceil(maxLength / 2));
    const randomString = buffer.toString('hex').slice(0, maxLength);
    return `FB-${randomString.slice(0, minLength)}`;
  }
  
  async searchFlights(payload: SearchFlightsDto) {
    try {
      this.logsService.saveApiCall('flightSearch', 'request', payload);

      const rawData = await this.thirdPartyApi.searchFlights(payload);

      this.logsService.saveApiCall('flightSearch', 'response', rawData);

      const formatted = this.flightsFormatter.formatAsJourneyList(rawData);

      const journeyList = Array.isArray(formatted.Search?.FlightDataList?.JourneyList)
        ? formatted.Search.FlightDataList.JourneyList.flat()
        : [];

      for (const flight of journeyList) {
        const thirdPartyToken = flight.thirdPartyToken?.trim(); 
        if (thirdPartyToken) {
          const redisToken = this.generateHashedToken(thirdPartyToken);
          // Store the third-party token with the redisToken as key
          await this.cacheManager.set(
            redisToken,
            { thirdPartyToken: thirdPartyToken },
            { ttl: 3600 } as any,
          );
          // Add the new redisToken to the flight object for the client
          (flight as any).redisToken = redisToken;
        }
      }
      return formatted;
    } catch (e) {
      console.error('API call or cache operation failed:', e);
      throw e;
    }
  }

  async getByToken(token: string): Promise<any> {
    const cleanToken = token?.trim();
    if (!cleanToken) {
      throw new NotFoundException('Token not provided');
    }

    try {
      const result = await this.cacheManager.get(cleanToken);
      if (!result) {
        throw new NotFoundException('Result not found for this token');
      }
      return result;
    } catch (e) {
      console.error('Cache GET failed:', e);
      throw new NotFoundException('Error retrieving token');
    }
  }

  async fareQuote(payload: FareQuoteDto) {
    this.logsService.saveApiCall('fareQuote', 'request', payload);

    // Step 1: Get the thirdPartyToken using the redisToken from the search
    const cachedData: CachedFlightData = await this.getByToken(payload.redisToken);
    
    // The API payload for fareQuote needs the thirdPartyToken from the search response
    const apiPayload = 
    {
      ResultToken: cachedData.thirdPartyToken,
    };

    try {
      const rawData = await this.thirdPartyApi.fareQuote(apiPayload);
      this.logsService.saveApiCall('fareQuote', 'response', rawData);

      // Step 2: Now, take the new thirdPartyToken from the fareQuote response
      const newThirdPartyToken = rawData.FareQuote?.[0]?.ResultToken;
      if (!newThirdPartyToken) {
          throw new BadRequestException('Invalid fare quote token from third-party API.');
      }

      // Step 3: Generate a NEW redisToken for this updated thirdPartyToken
      const newRedisToken = this.generateHashedToken(newThirdPartyToken);
      
      // Step 4: Store the new thirdPartyToken with the new redisToken as the key
      await this.cacheManager.set(
          newRedisToken,
          { thirdPartyToken: newThirdPartyToken },
          { ttl: 3600 } as any,
      );

      // Step 5: Return the fare quote data along with the new redisToken
      // The client will use this new redisToken for the commit booking call
      return { ...rawData, redisToken: newRedisToken };
    } catch (e) {
      this.logsService.saveApiCall('fareQuote', 'response-error', { message: e.message, data: e.response?.data });
      console.log('Fare Quote API call failed:', e.response?.data || e.message);
      throw e;
    }
  }

  async commitBooking(payload: CommitBookingDto): Promise<BookingResponseDto>{
    try {
      // Step 1: Use the new redisToken (sent as ResultToken in the payload) to get the final thirdPartyToken
      const cachedData: CachedFlightData = await this.getByToken(payload.ResultToken);
      if(!cachedData){
        throw new NotFoundException("Cached flight data not found. Please search again. ");
      } 

      // Step 2: Generate app reference
      const appReference = this.generateAppReference();

      // Step 3: Save the Request in JSON 
      const apiPayload = {
        AppReference : appReference,
        SequenceNumber: payload.SequenceNumber,
        // Use the thirdPartyToken retrieved from the cache
        ResultToken: cachedData.thirdPartyToken,
        Passengers: payload.Passengers,
      };
      this.logsService.saveApiCall('commitBooking', 'request', apiPayload);

      // Step 4: Call the supplier api 
      const rawResponse = await this.thirdPartyApi.commitBooking(apiPayload);

      // Step 5: Save the Response in JSON 
      this.logsService.saveApiCall('commitBooking', 'response', rawResponse);

      // Step 6: Format the Data 
      return this.flightsFormatter.formatBookingResponse(rawResponse);
    } catch (e:any){
      this.logsService.saveApiCall('commitBooking', 'response-error', {
          status: e.response?.status,
          message: e.message,
          data: e.response?.data,
      });
      console.error('Commit booking failed:', e.response?.data || e.message);
      throw new BadRequestException(e.response?.data || 'Third-party API booking error');
    }
  }
}