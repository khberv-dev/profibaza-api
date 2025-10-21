import { IsEmail, IsOptional, Length, Matches } from 'class-validator';

export default class UpdateUserDto {
  @IsOptional()
  @Length(2, 30)
  name: string;

  @IsOptional()
  @Length(2, 30)
  surname: string;

  @IsOptional()
  @Length(2, 30)
  middleName: string;

  @IsOptional()
  @Matches(/^998\d{9}$/u)
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string | null;
}
