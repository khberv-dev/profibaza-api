import { IsString, Length } from 'class-validator';

export default class CardPaymentDto {
  @IsString()
  invoice: string;

  @IsString()
  @Length(16, 16)
  card: string;

  @IsString()
  @Length(4, 4)
  expire: string;
}
