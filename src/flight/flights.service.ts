import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { createHmac } from 'crypto';
import { LogsService } from '../logs/logs.service';
import { ThirdPartyApiProvider } from 'src/Thirdparty_api/third-party-api.provider';
import { SearchFlightsDto } from 'src/dto/SearchFlights.dto';
import { FlightsFormatter } from './flights.formatter';
import { FareQuoteDto } from '../dto/fare-quote.dto';

// Define the interface for the cached data.
// It must match the data you are saving to Redis.
export interface CachedFlightData {
  thirdPartyToken: string;
  ResultToken: string;
  // ...other properties you're caching
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

    async searchFlights(payload: SearchFlightsDto) {
        try {
            const rawData = await this.thirdPartyApi.searchFlights(payload); // sends a request to supplier 
            this.logsService.saveApiCall('flightSearch', payload, rawData); // save the supplier response to json
            
            const formatted = this.flightsFormatter.formatAsJourneyList(rawData); //formted the supplier response 
            
            const journeyList = Array.isArray(formatted.Search.FlightDataList.JourneyList) 
                ? formatted.Search.FlightDataList.JourneyList.flat()
                : [];

            for (const flight of journeyList) {
                const thirdPartyToken = flight.thirdPartyToken?.trim(); 
                if (thirdPartyToken) {
                    const redisToken = this.generateHashedToken(thirdPartyToken); //Generate the redis token
                    await this.cacheManager.set(
                        redisToken,
                        // Save the data to the cache using consistent property names
                        { ...flight, thirdPartyToken: thirdPartyToken },
                        { ttl: 3600 } as any,
                    );
                    (flight as any).redisToken = redisToken;
                }
            }
            return formatted;
        } catch (e) {
            console.error('API call or cache operation failed:', e);
            throw e;
        }
    }

    async getByToken(token: string): Promise<CachedFlightData> {
        const cleanToken = token?.trim();
        if (!cleanToken) {
            throw new NotFoundException('Token not provided');
        }

        try {
            // Use the generic type to inform TypeScript about the expected data structure
            const result = await this.cacheManager.get<CachedFlightData>(cleanToken);
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
        // Step 1: Use the redisToken to retrieve the original flight data from the cache.
        // `cachedData` is now correctly typed as `CachedFlightData`
        const cachedData = await this.getByToken(payload.redisToken);
        
        // Step 2: Use the original thirdPartyToken to make the external API call.
        // The property is now correctly accessed as `thirdPartyToken`
        const apiPayload = {
            ResultToken: cachedData.thirdPartyToken,
        };

        try {
            const rawData = await this.thirdPartyApi.fareQuote(apiPayload);
            this.logsService.saveApiCall('fareQuote', apiPayload, rawData);
            return rawData;
        } catch (e) {
            console.log('Fare Quote API call failed:', e.response?.data || e.message);
            throw e;
        }
    }
}