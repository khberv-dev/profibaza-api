import { IsBoolean, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { JoyType } from './create-worker-profession.dto';

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
  @IsEnum(JoyType)
  jobType: JoyType;

  @IsOptional()
  @IsBoolean()
  readyForHugeProject: boolean;
}
