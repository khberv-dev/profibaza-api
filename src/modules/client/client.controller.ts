import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import UpdateAddressDto from '../user/dto/update-address.dto';
import ClientService from './client.service';
import { User } from '../../helpers/decorators/user.decorator';
import JwtAuthGuard from '../../helpers/guards/jwt-auth.guard';
import CreateOrderDto from './dto/create-order.dto';
import PostCommentDto from './dto/post-comment.dto';

@UseGuards(JwtAuthGuard)
@Controller('client')
export default class ClientController {
  constructor(private clientService: ClientService) {}

  @Get('me')
  async getMe(@User() user: User) {
    return this.clientService.getMe(user.roleUID);
  }

  @Put('update-address')
  async updateAddress(@User() user: User, @Body() body: UpdateAddressDto) {
    return this.clientService.updateAddress(user.roleUID, body);
  }

  @Post('create-order')
  async createOrder(@User() user: User, @Body() body: CreateOrderDto) {
    return this.clientService.createOrder(user.roleUID, body);
  }

  @Get('orders')
  async getOrders(@User() user: User) {
    return this.clientService.getOrders(user.roleUID);
  }

  @Post('comment/:id')
  async postComment(
    @User() user: User,
    @Param('id') orderId: string,
    @Body() body: PostCommentDto,
  ) {
    return this.clientService.postComment(user.roleUID, orderId, body);
  }
}
