import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class UpdateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  courseId: number;
}