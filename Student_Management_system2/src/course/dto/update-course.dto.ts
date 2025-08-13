import { IsOptional, IsString, IsInt } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';


@InputType()
export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  @Field()
  name?: string;

  @IsOptional()
  @IsInt()
  @Field()
  collegeId?: number;
}