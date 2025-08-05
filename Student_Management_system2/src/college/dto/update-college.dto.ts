import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class UpdateCollegeDto {
  @Field(() => Int)
  id: number; 
  
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(2, 100, { message: 'College name must be between 2 to 100 characters' })
  name?: string;
}
