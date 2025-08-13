import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { FareQuoteService } from './fareQuote.service';
import { CommitBooking } from './commitBooking.service';
 
@Module({
  imports: [HttpModule],
  providers: [FlightsService],
  controllers: [FlightsController],
  exports:[FareQuoteService,CommitBooking]
})
export class FlightsModule {}