import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCollegeDto {
  @IsOptional()
  @IsString()
  @Length(2, 100, { message: 'College name must be between 2 to 100 characters' })
  name?: string;
}