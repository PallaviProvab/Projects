import { IsString, Length } from 'class-validator';
import { ObjectType, Field, Int } from '@nestjs/graphql';

export class CreateCollegeDto {
  @IsString()
  @Length(2, 100, { message: 'College name must be between 2 to 100 characters' })
  name: string;
}