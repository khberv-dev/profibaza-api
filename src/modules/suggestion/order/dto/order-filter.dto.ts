import { IsArray, IsEnum, IsInt, IsNumber, IsOptional, IsString, Matches } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export enum WeekDay {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}

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

  @IsOptional()
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

  @IsOptional()
  @IsEnum(WeekDay)
  day: WeekDay;

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/)
  time: string;
}
