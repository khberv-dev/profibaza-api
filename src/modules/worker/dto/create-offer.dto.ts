import { IsString } from 'class-validator';

export default class CreateOfferDto {
  @IsString()
  vacancyId: string;

  @IsString()
  workerProfessionId: string;
}
