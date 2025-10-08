import { IsDecimal } from 'class-validator';

export default class LocationDto {
  @IsDecimal()
  longitude: number;

  @IsDecimal()
  latitude: number;

  @IsDecimal()
  radius: number;
}
