import { IsString } from 'class-validator';

export default class OfferDto {
  @IsString()
  message: string;
}
