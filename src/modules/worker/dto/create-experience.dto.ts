import { IsInt, IsOptional } from 'class-validator';

export default class CreateExperienceDto {
  @IsInt()
  startedAt: number;

  @IsOptional()
  @IsInt()
  endedAt: number;
}
