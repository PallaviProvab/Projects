import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';

import { FlightsFormatter } from './flights.formatter';
import { LogsModule } from 'src/logs/logs.module';
import { ThirdPartyApiProvider } from 'src/Thirdparty_api/third-party-api.provider';
 
@Module({
  imports: [HttpModule, LogsModule],
  providers: [FlightsService, ThirdPartyApiProvider, FlightsFormatter],
  controllers: [FlightsController],
  // exports:[FareQuoteService,CommitBooking]
})
export class FlightsModule {}