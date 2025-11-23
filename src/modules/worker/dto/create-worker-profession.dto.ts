import { IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import LocationDto from './location.dto';
import ScheduleDto from './schedule.dto';

export enum JobType {
  SOLO = 'SOLO',
  EMPLOYEE = 'EMPLOYEE',
  ABROAD = 'ABROAD',
}

export default class CreateWorkerProfessionDto {
  @IsString()
  professionId: string;

  @IsInt()
  minPrice: number;

  @IsInt()
  maxPrice: number;

  @IsBoolean()
  hasTeam: boolean;

  @IsInt()
  teamMemberCount: number;

  @IsOptional()
  @IsString()
  inventory: string;

  @IsOptional()
  @IsString()
  competitions: string;

  @IsOptional()
  @IsEnum(JobType)
  jobType: JobType;

  @IsBoolean()
  readyForHugeProject: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  locations: LocationDto[];

  @ValidateNested()
  @Type(() => ScheduleDto)
  schedule: ScheduleDto;
}
