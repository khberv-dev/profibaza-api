import { IsString, Length } from 'class-validator';

export default class UpdatePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  @Length(8, 40)
  password: string;
}
