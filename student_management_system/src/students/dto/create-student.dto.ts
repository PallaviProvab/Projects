import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsIn,
  ArrayNotEmpty,
  IsInt,
  Min,
} from 'class-validator';
import { Stream } from '../stream.enum';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1)
  age: number;

  @IsString()
  @IsNotEmpty()
  rollNo: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsIn(Object.values(Stream))
stream: Stream;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  subjectIds?: number[];
}
