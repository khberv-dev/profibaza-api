import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export default class UpdateVacancyDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsInt()
  salary: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;
}
