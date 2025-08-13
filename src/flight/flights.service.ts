import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';
 
@Injectable()
export class FlightsService {
    constructor(
        private readonly http: HttpService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) { }
 
    private buildCacheKey(payload: any): string {
        return 'tmx:search:' + Buffer.from(JSON.stringify(payload)).toString('base64');
    }

    
 
    private formatAsJourneyList(raw: any) {
        const journeys: any[] = raw?.Search?.FlightDataList?.JourneyList || [];
       
        const formattedJourneys = journeys.map((journey) =>
           
            journey.map((flight) => {
                const priceBreakup = flight?.Price?.PriceBreakup ?? {};
                const passengerBreakup = flight?.Price?.PassengerBreakup ?? {};
                const attributes = flight?.Attr ?? {};
      
                const redisToken = uuidv4();
 
                return {
                    FlightDetails: {
                       
                        Details: (flight?.FlightDetails?.Details ?? []).map((FlightStops: any[]) =>
                            FlightStops.map((segment: any) => ({
                                Origin: {
                                    AirportCode: segment.Origin?.AirportCode ?? null,
                                    CityName: segment.Origin?.CityName ?? null,
                                    AirportName: segment.Origin?.AirportName ?? null,
                                    DateTime: segment.Origin?.DateTime ?? null,
                                    Terminal: segment.Origin?.Terminal ?? null,
                                },
                                Destination: {
                                    AirportCode: segment.Destination?.AirportCode ?? null,
                                    CityName: segment.Destination?.CityName ?? null,
                                    AirportName: segment.Destination?.AirportName ?? null,
                                    DateTime: segment.Destination?.DateTime ?? null,
                                    Terminal: segment.Destination?.Terminal ?? null,
                                },
                                OperatorCode: segment.OperatorCode ?? null,
                                OperatorName: segment.OperatorName ?? null,
                                FlightNumber: segment.FlightNumber ?? null,
                                Duration: segment.Duration ?? null,
                                CabinClass: segment.CabinClass ?? null,
                                Attr: {
                                    Baggage: segment.Attr?.Baggage ?? null,
                                    CabinBaggage: segment.Attr?.CabinBaggage ?? null,
                                    AvailableSeats: segment.Attr?.AvailableSeats ?? null,
                                },
                                stop_over: segment.stop_over ?? null
                            }))
                        ),
                    },
                    Price: {
                        Currency: flight.Price?.Currency ?? null,
                        TotalDisplayFare: flight.Price?.TotalDisplayFare ?? null,
                        PriceBreakup: {
                            BasicFare: priceBreakup.BasicFare ?? null,
                            Tax: priceBreakup.Tax ?? null,
                            AgentCommission: priceBreakup.AgentCommission ?? null,
                        },
                        PassengerBreakup: {
                            ADT: {
                                BasePrice: passengerBreakup.ADT?.BasePrice ?? null,
                                Tax: passengerBreakup.ADT?.Tax ?? null,
                                TotalPrice: passengerBreakup.ADT?.TotalPrice ?? null,
                                PassengerCount: passengerBreakup.ADT?.PassengerCount ?? null,
                            },
                        },
                    },
                    resultToken: redisToken,
                    Attr: {
                        IsRefundable: attributes.IsRefundable ?? null,
                        AirlineRemark: attributes.AirlineRemark ?? null,
                        FareType: attributes.FareType ?? null,
                        IsLCC: attributes.IsLCC ?? null,
                        ExtraBaggage: attributes.ExtraBaggage ?? null,
                        conditions: {
                            IsPassportRequiredAtBook: attributes.conditions?.IsPassportRequiredAtBook ?? null,
                            IsPanRequiredAtBook: attributes.conditions?.IsPanRequiredAtBook ?? null,
                        },
                    },
                    apiResultToken : flight?.ResultToken ?? null
                };
            }),
        );
 
        return {
            Status: raw?.Status ?? null,
            Message: raw?.Message ?? '',
            Search: {
                FlightDataList: {
                    JourneyList: formattedJourneys,
                },
            },
        };
    }
 
    async searchFlights(payload: any) {
        const cacheKey = this.buildCacheKey(payload);
 
       
        const cached = await this.cacheManager.get<{ data: any }>(cacheKey);
        if (cached) {
            console.log('Cache hit for search payload');
            return cached.data;
        }
 
        const reqBody = {
            AdultCount: Number(payload.AdultCount),
            ChildCount: Number(payload.ChildCount),
            InfantCount: Number(payload.InfantCount),
            JourneyType: payload.JourneyType,
            PreferredAirlines: payload.PreferredAirlines?.length ? payload.PreferredAirlines : [],
            CabinClass: payload.CabinClass,
            Segments: [
                {
                    Origin: payload.Segments?.[0]?.Origin,
                    Destination: payload.Segments?.[0]?.Destination,
                    DepartureDate: payload.Segments?.[0]?.DepartureDate,
                },
            ],
        };
 
        const apiResp = await firstValueFrom(
            this.http.post(
                'http://test.services.travelomatix.com/webservices/index.php/flight/service/Search',
                reqBody,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-Username': 'test245274',
                        'x-Password': 'test@245',
                        'x-DomainKey': 'TMX3372451534825527',
                        'x-System': 'test',
                    },
                },
            ),
        );
 
        const rawData = apiResp?.data ?? {};
        const formatted = this.formatAsJourneyList(rawData);
 
       
        const journeyList = formatted.Search.FlightDataList.JourneyList.flat();
        const ttlMilliseconds = 3600 * 1000;
 
        for (const flight of journeyList) {
            const token = flight.resultToken;  
            if (token) {
                await this.cacheManager.set(token, flight, ttlMilliseconds);
            }
        }
 
       
        await this.cacheManager.set(cacheKey, { data: formatted }, ttlMilliseconds);
 
        return formatted;
    }
 
    async getByToken(token: string) {
        const cleanToken = token.trim();
        console.log('Looking up token:', cleanToken);
 
        const result = await this.cacheManager.get(cleanToken);
        console.log('Cache result:', result);
 
        if (!result) {
            throw new NotFoundException('Result not found for this token');
        }
        return result;
    }

    



}