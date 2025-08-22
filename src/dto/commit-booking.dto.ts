// src/dto/commit-booking.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PassengerDto {
  @IsOptional()
  @IsString()
  IsLeadPax: string; 

  @IsNotEmpty()
  @IsString()
  Title: string;

  @IsNotEmpty()
  @IsString()
  FirstName: string;

  @IsNotEmpty()
  @IsString()
  LastName: string;

  @IsNotEmpty()
  @IsString()
  PaxType: string; 

  @IsNotEmpty()
  @IsString()
  Gender: string; 
  @IsNotEmpty()
  @IsString()
  DateOfBirth: string;

  @IsOptional()
  @IsString()
  PassportNumber: string;

  @IsOptional()
  @IsString()
  PassportExpiry: string;

  @IsNotEmpty()
  @IsString()
  CountryCode: string;

  @IsNotEmpty()
  @IsString()
  CountryName: string;

  @IsNotEmpty()
  @IsString()
  ContactNo: string; 

  @IsNotEmpty()
  @IsString()
  City: string;

  @IsNotEmpty()
  @IsString()
  PinCode: string; 

  @IsNotEmpty()
  @IsString()
  AddressLine1: string;

  @IsOptional()
  @IsString()
  AddressLine2: string;

  @IsNotEmpty()
  @IsString()
  Email: string;

  @IsOptional()
  @IsString()
  BaggageId: string;

  @IsOptional()
  @IsString()
  MealId: string;

  @IsOptional()
  @IsString()
  SeatId: string;
}

export class CommitBookingDto {
  @IsNotEmpty()
  @IsString()
  ResultToken: string; 

  @IsNotEmpty()
  @IsNumber()
  SequenceNumber: number; 

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PassengerDto)
  Passengers: PassengerDto[];
}