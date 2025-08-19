import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FlightsService } from './flight/flights.service';
import { FlightsController } from './flight/flights.controller';
import { FareQuoteService } from './flight/fareQuote.service';
import { CommitBooking } from './flight/commitBooking.service';
import { HoldTicketService } from './flight/holdticket.service';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 3600, // cache time-to-live in seconds
      max: 100,  // maximum number of items in cache
      isGlobal: true, // makes cache available everywhere without re-import
    }),
  ],
  controllers: [FlightsController],
  providers: [FlightsService, FareQuoteService, CommitBooking, HoldTicketService],
})
export class AppModule {}
