import { IsArray, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export default class OrderFilterDto {
  @IsInt()
  minPrice: number;

  @IsInt()
  maxPrice: number;

  @IsOptional()
  @IsNumber()
  long: number;

  @IsOptional()
  @IsNumber()
  lat: number;

  @IsOptional()
  @IsNumber()
  radius: number;

  @IsArray()
  @IsString({ each: true })
  professions: string[];

  @IsOptional()
  @IsString()
  address1: string;

  @IsOptional()
  @IsString()
  address2: string;

  @IsOptional()
  @IsString()
  address3: string;
}
