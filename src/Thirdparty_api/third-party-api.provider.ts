import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { SearchFlightsDto, JourneyType } from 'src/dto/SearchFlights.dto';

@Injectable()
export class ThirdPartyApiProvider {
  private readonly logger = new Logger(ThirdPartyApiProvider.name);
  private readonly headers = {
    'Content-Type': 'application/json',
    'x-Username': 'test245274',
    'x-Password': 'test@245',
    'x-DomainKey': 'TMX3372451534825527',
    'x-System': 'test',
  };

  constructor(private readonly http: HttpService) {}

  async searchFlights(payload: any) {
    const url = 'http://test.services.travelomatix.com/webservices/index.php/flight/service/Search';
    let apiPayload: any;

    
    if (payload.JourneyType === JourneyType.MultiCity) {
      apiPayload = {
        ...payload,
        Segments: payload.Segments.map(segment => ({
          Origin: segment.Origin,
          Destination: segment.Destination,
          DepartureDate: segment.DepartureDate,
        })),
      };
    } else {
      const firstSegment = payload.Segments[0];
      apiPayload = {
        ...payload,
        Origin: firstSegment.Origin,
        Destination: firstSegment.Destination,
        DepartureDate: firstSegment.DepartureDate,
      };
    }
    
    try {
      this.logger.log(`Calling searchFlights API with payload: ${JSON.stringify(apiPayload)}`);
      const response = await firstValueFrom(
        this.http.post(url, apiPayload, { headers: this.headers }),
      );
      return response.data;
    } catch (error: AxiosError | any) {
      this.logger.error('API searchFlights failed:', error.response?.data || error.message);
      throw error;
    }
  }

  async fareQuote(payload: any) {
    const url = 'http://test.services.travelomatix.com/webservices/index.php/flight/service/UpdateFareQuote';
    const response = await firstValueFrom(
      this.http.post(url, payload, { headers: this.headers }),
    );
    return response.data;
  }

  async commitBooking(payload: any) {
    const url = 'http://test.services.travelomatix.com/webservices/index.php/flight/service/CommitBooking';
    const response = await firstValueFrom(
      this.http.post(url, payload, { headers: this.headers })
    );
    return response.data;
  }
}
