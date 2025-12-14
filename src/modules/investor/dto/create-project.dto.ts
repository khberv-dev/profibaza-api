import { IsArray, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import ProjectEmploymentDto from './project-employment.dto';

export enum ProjectScale {
  SMALL = 'SMALL',
  MIDDLE = 'MIDDLE',
  LARGE = 'LARGE',
}

export default class CreateProjectDto {
  @IsEnum(ProjectScale)
  capacity: ProjectScale;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  partners: string[];

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description: string;

  @IsArray()
  @Type(() => ProjectEmploymentDto)
  employment: ProjectEmploymentDto[];
}
