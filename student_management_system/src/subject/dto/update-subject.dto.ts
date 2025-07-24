import { IsIn, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateSubjectDto {
  @IsIn(['arts', 'science'])
  stream: 'arts' | 'science';

  @IsString()
  @IsNotEmpty()
    @IsOptional()
  name?: string;



}