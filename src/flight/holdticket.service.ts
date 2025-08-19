import { Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import type { Cache } from "cache-manager";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class HoldTicketService {
  constructor(
    private readonly http: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  formatHoldTicket(raw: any) {
    return {
      Status: raw?.Status ?? null,
      Message: raw?.Message ?? null,
      HoldTicket: {
        BookingDetails: {
          BookingId: raw?.HoldTicket?.BookingDetails?.BookingId ?? null,
          PNR: raw?.HoldTicket?.BookingDetails?.PNR ?? null,
          TicketingTimeLimit:
            raw?.HoldTicket?.BookingDetails?.TicketingTimeLimit ?? null,
          PassengerDetails: (
            raw?.HoldTicket?.BookingDetails?.PassengerDetails || []
          ).map((details) => ({
            PassengerId: details?.PassengerId ?? null,
            PassengerType: details?.PassengerType ?? null,
            Title: details?.Title ?? null,
            FirstName: details?.FirstName ?? null,
            LastName: details?.LastName ?? null,
          })),
          JourneyList: {
            FlightDetails: {
              Details: (
                raw?.HoldTicket?.BookingDetails?.JourneyList?.FlightDetails
                  ?.Details ?? []
              ).map((segmentArray) =>
                segmentArray.map((segment) => ({
                  Origin: {
                    AirportCode: segment?.Origin?.AirportCode ?? null,
                    CityName: segment?.Origin?.CityName ?? null,
                    AirportName: segment?.Origin?.AirportName ?? null,
                    DateTime: segment?.Origin?.DateTime ?? null,
                    FDTV: segment?.Origin?.FDTV ?? null,
                    Terminal: segment?.Origin?.Terminal ?? null,
                  },
                  Destination: {
                    AirportCode: segment?.Destination?.AirportCode ?? null,
                    CityName: segment?.Destination?.CityName ?? null,
                    AirportName: segment?.Destination?.AirportName ?? null,
                    DateTime: segment?.Destination?.DateTime ?? null,
                    FDTV: segment?.Destination?.FDTV ?? null,
                    Terminal: segment?.Destination?.Terminal ?? null,
                  },
                  AirlinePNR: segment?.AirlinePNR ?? null,
                  OperatorCode: segment?.OperatorCode ?? null,
                  DisplayOperatorCode: segment?.DisplayOperatorCode ?? null,
                  OperatorName: segment?.OperatorName ?? null,
                  FlightNumber: segment?.FlightNumber ?? null,
                  CabinClass: segment?.CabinClass ?? null,
                  Attr: {
                    Baggage: segment?.Attr?.Baggage ?? null,
                    CabinBaggage: segment?.Attr?.CabinBaggage ?? null,
                    AvailableSeats: segment?.Attr?.AvailableSeats ?? null,
                  },
                }))
              ),
            },
          },
          Price: {
            Currency: raw?.HoldTicket?.BookingDetails?.Price?.Currency ?? null,
            TotalDisplayFare:
              raw?.HoldTicket?.BookingDetails?.Price?.TotalDisplayFare ?? null,
          },
        },
      },
    };
  }

  async holdTicket(ResultToken: string) {
    const response = await firstValueFrom(
      this.http.post(
        "http://test.services.travelomatix.com/webservices/index.php/flight/service/HoldTicket",
        ResultToken,
        {
          headers: {
            "Content-Type": "application/json",
            "x-Username": "test245274",
            "x-Password": "test@245",
            "x-DomainKey": "TMX3372451534825527",
            "x-System": "test",
          },
        }
      )
    );

    return this.formatHoldTicket(response.data);
  }
}
