import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, IsInt } from 'class-validator';

@InputType() // Add this to use in GraphQL
export class CreateStudentDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field(() => Int)
  @IsInt()
  collegeId: number;

  @Field(() => Int)
  @IsInt()
  courseId: number;

  @Field(() => Int)
  @IsInt()
  departmentId: number;

  @Field(() => Int)
  @IsInt()
  creditLimitts: number;
}
