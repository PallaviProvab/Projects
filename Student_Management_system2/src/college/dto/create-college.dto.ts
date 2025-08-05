import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class CreateCollegeDto {
  @Field()
  @IsString()
  @Length(2, 100, { message: 'College name must be between 2 to 100 characters' })
  name: string;
}
