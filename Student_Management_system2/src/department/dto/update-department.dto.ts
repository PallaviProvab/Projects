import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';


@InputType()
export class UpdateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Field()
  courseId: number;
}