import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProfessionCategoryDto {
  @IsString()
  nameUz: string;

  @IsString()
  nameRu: string;
}

export class ProfessionDto {
  @IsString()
  nameUz: string;

  @IsString()
  nameRu: string;
}

export default class CreateProfessionDto {
  @IsString()
  nameUz: string;

  @IsString()
  nameRu: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProfessionDto)
  professions: ProfessionDto[];
}
