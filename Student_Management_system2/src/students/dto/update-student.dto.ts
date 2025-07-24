import {
  IsString,
  IsNumber,
  IsOptional,
  IsIn,
  IsArray,
  IsInt,
  ArrayNotEmpty,
} from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsString()
  rollNo?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsIn(['arts', 'science'])
  stream?: 'arts' | 'science';

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  subjects?: number[];
}
