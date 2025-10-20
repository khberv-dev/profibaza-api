import { IsEmail, IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator';

export enum UserRole {
  CLIENT = 'CLIENT',
  WORKER = 'WORKER',
  LEGAL = 'LEGAL',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export default class RegisterDto {
  @Length(2, 30)
  @Matches(/^\p{L}+$/u)
  name: string;

  @Length(2, 30)
  @Matches(/^\p{L}+$/u)
  surname: string;

  @Length(2, 30)
  @Matches(/^\p{L}+$/u)
  middleName: string;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsString()
  birthday: string;

  @Matches(/^998\d{9}$/u)
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string | null;

  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsString()
  address1: string;

  @IsOptional()
  @IsString()
  address2: string;

  @IsOptional()
  @IsString()
  address3: string;

  @IsString()
  @Length(8, 40)
  password: string;
}
