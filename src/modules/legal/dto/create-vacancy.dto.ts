import { IsInt, IsString } from 'class-validator';

export default class CreateVacancyDto {
  @IsString()
  title: string;

  @IsInt()
  salary: number;

  @IsString()
  description: string;
}
