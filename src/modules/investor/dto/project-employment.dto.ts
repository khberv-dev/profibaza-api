import { IsEnum, IsInt, IsString } from 'class-validator';

export enum EmploymentType {
  EMPLOYEE = 'EMPLOYEE',
  FREELANCE = 'FREELANCE',
  CONTRACT = 'CONTRACT',
}

export enum WorkGraph {
  FULLTIME = 'FULLTIME',
  PARTTIME = 'PARTTIME',
  FLEX = 'FLEX',
}

export default class ProjectEmploymentDto {
  @IsString()
  profession: string;

  @IsInt()
  count: number;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsEnum(EmploymentType)
  employmentType: EmploymentType;

  @IsEnum(WorkGraph)
  workGraph: WorkGraph;
}
