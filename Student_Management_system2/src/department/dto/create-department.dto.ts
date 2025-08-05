import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';


@InputType()
export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsInt()
  courseId: number;
}