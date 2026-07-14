import { IsString } from 'class-validator';

export default class CreateTehnikumDto {
  @IsString()
  name: string;
}
