// src/flights/third-party-api.provider.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ThirdPartyApiProvider {
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
    const response = await firstValueFrom(
      this.http.post(url, payload, { headers: this.headers }),
    );
    return response.data;
  }

   async fareQuote(payload: any) {
    const url = 'http://test.services.travelomatix.com/webservices/index.php/flight/service/UpdateFareQuote';
    const response = await firstValueFrom(
      this.http.post(url, payload, { headers: this.headers }),
    );
    return response.data;
  }
}