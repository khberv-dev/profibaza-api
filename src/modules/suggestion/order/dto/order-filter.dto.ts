import { IsArray, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

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
  long: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  lat: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  radius: number = 0;

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
