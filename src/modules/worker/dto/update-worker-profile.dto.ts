import { IsEnum, IsOptional } from 'class-validator';

export enum PositionType {
  TEHNIKUM = 'TEHNIKUM',
  DIPLOMA = 'DIPLOMA',
}

export default class UpdateWorkerProfileDto {
  @IsOptional()
  @IsEnum(PositionType)
  position?: PositionType;
}
