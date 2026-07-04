import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator';

const timeFormat = /^([01]\d|2[0-3]):[0-5]\d$/;

export default class ScheduleDto {
  @IsBoolean()
  monday: boolean;

  @IsOptional()
  @IsString()
  @Matches(timeFormat)
  mondayStart?: string;

  @IsOptional()
  @IsString()
  @Matches(timeFormat)
  mondayEnd?: string;

  @IsBoolean()
  tuesday: boolean;

  @IsOptional()
  @IsString()
  @Matches(timeFormat)
  tuesdayStart?: string;

  @IsOptional()
  @IsString()
  @Matches(timeFormat)
  tuesdayEnd?: string;

  @IsBoolean()
  wednesday: boolean;

  @IsOptional()
  @IsString()
  @Matches(timeFormat)
  wednesdayStart?: string;

  @IsOptional()
  @IsString()
  @Matches(timeFormat)
  wednesdayEnd?: string;

  @IsBoolean()
  thursday: boolean;

  @IsOptional()
  @IsString()
  @Matches(timeFormat)
  thursdayStart?: string;

  @IsOptional()
  @IsString()
  @Matches(timeFormat)
  thursdayEnd?: string;

  @IsBoolean()
  friday: boolean;

  @IsOptional()
  @IsString()
  @Matches(timeFormat)
  fridayStart?: string;

  @IsOptional()
  @IsString()
  @Matches(timeFormat)
  fridayEnd?: string;

  @IsBoolean()
  saturday: boolean;

  @IsOptional()
  @IsString()
  @Matches(timeFormat)
  saturdayStart?: string;

  @IsOptional()
  @IsString()
  @Matches(timeFormat)
  saturdayEnd?: string;

  @IsBoolean()
  sunday: boolean;

  @IsOptional()
  @IsString()
  @Matches(timeFormat)
  sundayStart?: string;

  @IsOptional()
  @IsString()
  @Matches(timeFormat)
  sundayEnd?: string;
}
