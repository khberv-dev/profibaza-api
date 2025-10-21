import { IsArray, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export default class OrderFilterDto {
  @Type(() => Number)
  @IsInt()
  minPrice: number;

  @Type(() => Number)
  @IsInt()
  maxPrice: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  long: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lat: number;

  @IsOptional()
  @Type(() => Number)
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
