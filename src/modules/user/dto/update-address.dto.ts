import { IsOptional, IsString } from 'class-validator';

export default class UpdateAddressDto {
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
