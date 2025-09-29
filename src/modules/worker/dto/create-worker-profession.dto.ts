import { IsBoolean, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export enum JoyType {
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
  @IsEnum(JoyType)
  jobType: JoyType;

  @IsBoolean()
  readyForHugeProject: boolean;
}
