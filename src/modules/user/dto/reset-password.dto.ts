import { IsString, Length } from 'class-validator';

export default class ResetPasswordDto {
  @IsString()
  requestId: string;

  @IsString()
  code: string;

  @IsString()
  @Length(8, 40)
  password: string;
}
