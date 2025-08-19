import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FareQuoteService } from './fareQuote.service';
import { CommitBooking } from './commitBooking.service';
import { HoldTicketService } from './holdticket.service';



 
@Controller('flights')
export class FlightsController {
  constructor(
    private readonly flightsService: FlightsService,
    private readonly FareQuoteService:FareQuoteService,
     private readonly CommitBookingService:CommitBooking,
     private readonly holdTicketService : HoldTicketService
    ) {}
 
  @Post('search')
  async search(@Body() body: any) {
    return this.flightsService.searchFlights(body);
  }
 
  @Get('by-token/:token')
  async getByToken(@Param('token') token: string) {
   
    return this.flightsService.getByToken(token);
  }

  @Post('FareQuote')
  async FareQuote(@Body() body:any){
       return this.FareQuoteService.FetchFareQuoteFromApi(body)
  }
 
  @Get('by-Search-token/:token')
  async ByToken(@Param('token') token: string) {
 
      console.log("token controller called ")
    return this.FareQuoteService.GetByToken(token)
  }

   @Post('reservation')
  async holdTicket(@Body("ResultToken") ResultToken: string) {
    return this.holdTicketService.holdTicket(ResultToken);
  }
 
  @Post('CommitBooking')
  async CommitBooking(@Body() body:any){
     return this.CommitBookingService.CommitBooking(body)
  }
}
