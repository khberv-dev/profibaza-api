import { IsString } from 'class-validator';

export default class LoginDto {
  @IsString()
  phone: string;

  @IsString()
  password: string;
}
