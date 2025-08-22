import { Controller, Post, Body, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { FlightsService,CachedFlightData  } from './flights.service';
import { SearchFlightsDto } from 'src/dto/SearchFlights.dto';
import { FareQuoteDto } from 'src/dto/fare-quote.dto';
 
@Controller('flights')
export class FlightsController {
  constructor(
    private readonly flightsService: FlightsService,
    ) {}

  @Post('search')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async search(@Body() payload: SearchFlightsDto) {
    return this.flightsService.searchFlights(payload);
  }
 
  @Post('fare-quote')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async fareQuote(@Body() payload: FareQuoteDto) {
    return this.flightsService.fareQuote(payload);
  }
 
  @Get('by-token/:token')
  async getByToken(@Param('token') token: string) {
    return this.flightsService.getByToken(token);
  }

  @Post('CommitBooking')
  async CommitBooking(@Body() body:any){
     return this.flightsService.commitBooking(body)
  }


  //  @Post('reservation')
  // async holdTicket(@Body("ResultToken") ResultToken: string) {
  //   return this.holdTicketService.holdTicket(ResultToken);
  // }
 
  
}
