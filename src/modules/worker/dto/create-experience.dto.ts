import { IsInt, IsOptional, IsString } from 'class-validator';

export default class CreateExperienceDto {
  @IsInt()
  startedAt: number;

  @IsOptional()
  @IsInt()
  endedAt: number;

  @IsString()
  jobPlace: string;

  @IsString()
  jobDescription: string;
}
