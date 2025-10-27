import { IsArray, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export default class OrderFilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  minPrice: number;

  @IsOptional()
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
  @Transform(({ value }) => (typeof value === 'string' ? value.split(',') : value))
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
