import { IsDecimal, IsInt } from 'class-validator';

export default class LocationDto {
  @IsDecimal()
  longitude: string;

  @IsDecimal()
  latitude: string;

  @IsInt()
  radius: number;
}
