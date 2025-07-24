import {
  IsNotEmpty, IsEmail, IsInt, IsString
} from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsInt()
  collegeId: number;

  @IsInt()
  courseId: number;

  @IsInt()
  degreeId: number;

  @IsInt()
  creditLimit: number;
}