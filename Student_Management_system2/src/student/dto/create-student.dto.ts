import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsInt()
  collegeId: number;

  @IsInt()
  courseId: number;

  @IsInt()
  departmentId: number;

  @IsInt()
  creditLimit: number;
}
