import { IsString } from 'class-validator';

export default class CardVerifyDto {
  @IsString()
  invoice: string;

  @IsString()
  token: string;

  @IsString()
  code: string;
}
