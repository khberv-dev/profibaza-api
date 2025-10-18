import {
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
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
    @Query('long', ParseIntPipe) long: number,
    @Query('lat', ParseIntPipe) lat: number,
    @Query('radius', ParseIntPipe) radius: number,
    @Query('professions', ParseArrayPipe) professions: string[],
  ) {
    return this.orderService.findOrders(minPrice, maxPrice, professions, long, lat, radius);
  }

  @Get('search/:id')
  async getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }
}
