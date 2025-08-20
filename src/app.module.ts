
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
// import { FlightsService } from './flight/flights.service';
// import { FlightsController } from './flight/flights.controller';
import { LogsModule } from './logs/logs.module';
import { FlightsModule } from './flight/flights.module';
// import { FareQuoteService } from './flight/fareQuote.service';
// import { CommitBooking } from './flight/commitBooking.service';
// import { HoldTicketService } from './flight/holdticket.service';

@Module({
  imports: [
    HttpModule,
    CacheModule.registerAsync({
     useFactory: async () => ({
        store: redisStore,
        host: 'localhost', 
        port: 6379, 
        ttl: 3600, 
      }),
      isGlobal: true, 
    }), LogsModule, FlightsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
