import { IsString } from 'class-validator';

export default class VerifyOtpDto {
  @IsString()
  phone: string;

  @IsString()
  code: string;
}
