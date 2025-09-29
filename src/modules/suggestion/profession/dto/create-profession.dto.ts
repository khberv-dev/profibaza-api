import { IsString } from 'class-validator';

export default class CreateProfessionDto {
  @IsString()
  nameUz: string;

  @IsString()
  nameRu: string;
}
