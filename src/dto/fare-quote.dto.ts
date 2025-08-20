import { IsNotEmpty, IsString } from 'class-validator';

export class FareQuoteDto {
  @IsNotEmpty()
  @IsString()
  redisToken: string;
}