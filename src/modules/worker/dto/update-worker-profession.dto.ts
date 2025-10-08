import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { JobType } from './create-worker-profession.dto';
import { Type } from 'class-transformer';
import LocationDto from './location.dto';

export default class UpdateWorkerProfessionDto {
  @IsOptional()
  @IsString()
  professionId: string;

  @IsOptional()
  @IsInt()
  minPrice: number;

  @IsOptional()
  @IsInt()
  maxPrice: number;

  @IsOptional()
  @IsBoolean()
  hasTeam: boolean;

  @IsOptional()
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

  @IsOptional()
  @IsBoolean()
  readyForHugeProject: boolean;

  // @IsOptional()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => LocationDto)
  // locations: LocationDto[];
}
