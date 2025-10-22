import { IsEnum, IsString } from 'class-validator';

export enum ContactType {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
}

export default class CreateContactDto {
  @IsString()
  person: string;

  @IsString()
  contact: string;

  @IsEnum(ContactType)
  type: ContactType;
}
