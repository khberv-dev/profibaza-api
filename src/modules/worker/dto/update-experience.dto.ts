import { IsInt, IsOptional, IsString } from 'class-validator';

export default class UpdateExperienceDto {
  @IsOptional()
  @IsInt()
  startedAt: number;

  @IsOptional()
  @IsInt()
  endedAt: number;

  @IsOptional()
  @IsString()
  jobPlace: string;

  @IsOptional()
  @IsString()
  jobDescription: string;
}
