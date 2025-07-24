import { IsIn, IsString, IsNotEmpty } from 'class-validator';

export class CreateSubjectDto {
  @IsIn(['arts', 'science'])
  stream: 'arts' | 'science';

  @IsString()
  @IsNotEmpty()
  name: string;
}