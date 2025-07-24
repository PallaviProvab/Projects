import { IsInt, Min, Max } from 'class-validator';


export class UpdateMarkDto {
  @IsInt()
  @Min(0)
  @Max(100)
  marks: number;
}