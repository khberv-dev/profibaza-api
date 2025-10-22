import { Controller, Get, Param, Query } from '@nestjs/common';
import OrderService from './order.service';
import OrderFilterDto from './dto/order-filter.dto';

@Controller('opt/order')
export default class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('search')
  async findOrders(@Query() filter: OrderFilterDto) {
    return this.orderService.findOrders(filter);
  }

  @Get('search/:id')
  async getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }
}
