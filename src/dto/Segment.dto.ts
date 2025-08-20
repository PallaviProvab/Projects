// src/dto/segment.dto.ts
import { IsString, IsNotEmpty, IsDateString , IsOptional} from 'class-validator';

export class SegmentDto {
  @IsNotEmpty()
  @IsString()
  Origin: string;

  @IsNotEmpty()
  @IsString()
  Destination: string;

  @IsNotEmpty()
  @IsDateString()
  DepartureDate: string;

  @IsOptional()
  @IsDateString()
  ReturnDate?: string; 
}