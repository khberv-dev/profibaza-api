import { IsEnum, IsOptional, IsString, ValidateIf } from 'class-validator';

export enum PositionType {
  TEHNIKUM = 'TEHNIKUM',
  DIPLOMA = 'DIPLOMA',
}

export default class UpdateWorkerProfileDto {
  @IsOptional()
  @IsEnum(PositionType)
  position?: PositionType;

  @ValidateIf((o: UpdateWorkerProfileDto) => o.position === PositionType.TEHNIKUM)
  @IsString()
  tehnikumId?: string;
}
