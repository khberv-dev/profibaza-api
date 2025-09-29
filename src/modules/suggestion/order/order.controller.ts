import { Controller, Get, ParseArrayPipe, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import OrderService from './order.service';
import JwtAuthGuard from '../../../helpers/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('opt/order')
export default class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('search')
  async findOrders(
    @Query('minPrice', ParseIntPipe) minPrice: number,
    @Query('maxPrice', ParseIntPipe) maxPrice: number,
    @Query('professions', ParseArrayPipe) professions: string[],
  ) {
    return this.orderService.findOrders(minPrice, maxPrice, professions);
  }
}
