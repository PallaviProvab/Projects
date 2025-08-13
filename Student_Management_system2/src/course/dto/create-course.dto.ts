import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';


@InputType()
export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Field()
  collegeId: number;
}