import { IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateMarkDto {
  @IsInt()
  @IsNotEmpty()
  studentId: number;

  @IsInt()
  @IsNotEmpty()
  subjectId: number;

  @IsInt()
  @Min(0)
  @Max(100)
  marks: number;
}