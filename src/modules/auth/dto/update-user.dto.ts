import { IsEmail, IsOptional, Length, Matches } from 'class-validator';

export default class UpdateUserDto {
  @IsOptional()
  @Length(2, 30)
  @Matches(/^\p{L}+$/u)
  name: string;

  @IsOptional()
  @Length(2, 30)
  @Matches(/^\p{L}+$/u)
  surname: string;

  @IsOptional()
  @Length(2, 30)
  @Matches(/^\p{L}+$/u)
  middleName: string;

  @IsOptional()
  @Matches(/^998\d{9}$/u)
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string | null;
}
