import {
  IsNotEmpty, IsEmail, IsInt, IsString
} from 'class-validator';

export class UpdateStudentDto {
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
  departmentId: number;

  @IsInt()
  creditLimit: number;
}