import { Injectable , BadRequestException} from '@nestjs/common';
import { BookingResponseDto } from 'src/dto/booking-response.dto';

@Injectable()
export class FlightsFormatter {
    formatAsJourneyList(raw: any) {
        const journeys: any[][] = raw?.Search?.FlightDataList?.JourneyList ?? [];

        const formattedJourneys = journeys.map((journey = []) =>
            journey.map((flight = {}) => {
                const priceBreakup = flight?.Price?.PriceBreakup ?? {};
                const passengerBreakup = flight?.Price?.PassengerBreakup ?? {};
                const attributes = flight?.Attr ?? {};

                return {
                    FlightDetails: {
                        Details: (flight?.FlightDetails?.Details ?? []).map(
                            (FlightStops: any[] = []) =>
                                FlightStops.map((segment: any = {}) => ({
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
                                    stop_over: segment.stop_over ?? null,
                                })),
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
                    thirdPartyToken: flight?.ResultToken ?? null,
                    redisToken: null,
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

    //This is for Formate the Commit Booking Response 
    formatBookingResponse(rawResponse: any): BookingResponseDto {
        const bookingDetails = rawResponse?.CommitBooking?.[0]?.BookingDetails?.[0];

        if (!bookingDetails) {
            throw new BadRequestException('Invalid booking response from third-party API.');
        }

        const passengers = bookingDetails.PassengerDetails.map(p => ({
            TicketNumber: p.TicketNumber,
            FirstName: p.FirstName,
            LastName: p.LastName,
        }));

        return {
            PNR: bookingDetails.PNR,
            BookingId: bookingDetails.BookingId,
            GDSPNR: bookingDetails.GDSPNR,
            PassengerDetails: passengers,
        };
    }
    
}
