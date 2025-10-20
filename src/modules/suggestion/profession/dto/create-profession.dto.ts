import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProfessionDto {
  @IsString()
  nameUz: string;

  @IsString()
  nameRu: string;
}

export default class CreateProfessionDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProfessionDto)
  professions: ProfessionDto[];
}
