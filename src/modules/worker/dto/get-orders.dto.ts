import { IsEnum, IsOptional } from 'class-validator';

export enum OrderStatus {
  NEW = 'NEW',
  PROGRESS = 'PROGRESS',
  DONE = 'DONE',
  REJECTED = 'REJECTED',
}

export default class GetOrdersDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
