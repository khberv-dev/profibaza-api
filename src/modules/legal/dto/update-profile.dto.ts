import { IsString } from 'class-validator';

export default class UpdateProfileDto {
  @IsString()
  name: string;
}
