import { IsString, Length, Matches } from 'class-validator';

export default class CreateOrderDto {
  @IsString()
  workerProfessionId: string;

  @IsString()
  @Length(10, 300)
  description: string;

  @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/)
  deadline: string;
}
