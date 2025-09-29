import { Matches } from 'class-validator';

export default class RequestResetPasswordDto {
  @Matches(/^998\d{9}$/u)
  phone: string;
}
