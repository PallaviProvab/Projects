import { IsString, IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PassengerDetailsDto {
  @IsNotEmpty()
  @IsString()
  TicketNumber: string;

  @IsNotEmpty()
  @IsString()
  FirstName: string;

  @IsNotEmpty()
  @IsString()
  LastName: string;
}

export class BookingResponseDto {
  @IsNotEmpty()
  @IsString()
  PNR: string;

  @IsNotEmpty()
  @IsString()
  BookingId: string;

  @IsNotEmpty()
  @IsString()
  GDSPNR: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PassengerDetailsDto)
  PassengerDetails: PassengerDetailsDto[];
}
