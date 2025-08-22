// src/dto/search-flights.dto.ts
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  IsOptional,
  IsArray
} from 'class-validator';
import { Type } from 'class-transformer';
import { SegmentDto } from './Segment.dto';

export enum JourneyType {

  OneWay = 'OneWay',
  Return = 'Return',
  MultiCity = 'Multicity',
}

export enum CabinClass {
  Economy = 'Economy',
  Business = 'Business',
  First = 'First',
  PremiumEconomy = 'PremiumEconomy',
  PremiumBusiness = 'PremiumBusiness',
 

}

export class SearchFlightsDto {
  @IsNotEmpty()
  @IsNumber()
  AdultCount: number;

  @IsNotEmpty()
  @IsNumber()
  ChildCount: number;

  @IsNotEmpty()
  @IsNumber()
  InfantCount: number;

  @IsNotEmpty()
  @IsEnum(JourneyType)
  JourneyType: JourneyType;

  @IsOptional()
  @IsArray()
  @IsString({each:true})
  PreferredAirlines: string;

  @IsNotEmpty()
  @IsEnum(CabinClass)
  CabinClass: CabinClass;

  @IsOptional()
  @IsString()
  Currency: string;

  @IsOptional()
  @IsString()
  NonStopFlights: string;

  @IsOptional()
  @IsNumber()
  PlusMinus3Days: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SegmentDto)
  Segments: SegmentDto[];
}