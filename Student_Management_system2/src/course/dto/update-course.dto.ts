import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  collegeId?: number;
}