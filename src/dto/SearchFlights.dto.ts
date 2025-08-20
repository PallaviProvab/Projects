import {
  IsInt,
  Min,
  IsEnum,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsOptional,
  IsString,
  ValidateIf
} from 'class-validator';
import { Type } from 'class-transformer';
import { SegmentDto } from './Segment.dto';

export enum JourneyType {
  ONEWAY = 'OneWay',
  RETURN = 'Return',
  MULTICITY = 'Multicity',
}

export enum CabinClass {
  ECONOMY = 'Economy',
  BUSINESS = 'Business',
  FIRST = 'First',
  PREMIUM_ECONOMY = 'PremiumEconomy',
  PREMIUM_BUSINESS = 'PremiumBusiness',
}

export class SearchFlightsDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  AdultCount: number;

  @IsInt()
  @Min(0)
  @Type(() => Number)
  ChildCount: number;

  @IsInt()
  @Min(0)
  @Type(() => Number)
  InfantCount: number;

  @IsEnum(JourneyType)
  JourneyType: JourneyType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  PreferredAirlines?: string[];

  @IsEnum(CabinClass)
  CabinClass: CabinClass;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SegmentDto)
  // This is the key change. We validate the return date conditionally.
  // We need an array of segments for all journey types.
  // For 'Return', the segments array should contain both the departure and return flights.
  Segments: SegmentDto[];

  @ValidateIf(o => o.JourneyType === JourneyType.RETURN)
  @ValidateNested()
  @Type(() => SegmentDto)
  returnSegment: SegmentDto;
}