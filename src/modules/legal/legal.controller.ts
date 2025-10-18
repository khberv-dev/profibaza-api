import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import LegalService from './legal.service';
import { User } from '../../helpers/decorators/user.decorator';
import UpdateAddressDto from '../user/dto/update-address.dto';
import PostCommentDto from '../client/dto/post-comment.dto';
import JwtAuthGuard from '../../helpers/guards/jwt-auth.guard';
import UpdateProfileDto from './dto/update-profile.dto';
import CreateOrderDto from '../client/dto/create-order.dto';
import CreateVacancyDto from './dto/create-vacancy.dto';
import UpdateVacancyDto from './dto/update-vacancy.dto';

@Controller('legal')
@UseGuards(JwtAuthGuard)
export default class LegalController {
  constructor(private legalService: LegalService) {}

  @Get('me')
  async getMe(@User() user: User) {
    return this.legalService.getMe(user.roleUID);
  }

  @Put('update-profile')
  async updateProfile(@User() user: User, @Body() body: UpdateProfileDto) {
    return this.legalService.updateProfile(user.roleUID, body);
  }

  @Put('update-address')
  async updateAddress(@User() user: User, @Body() body: UpdateAddressDto) {
    return this.legalService.updateAddress(user.roleUID, body);
  }

  @Post('comment/:id')
  async postComment(
    @User() user: User,
    @Param('id') orderId: string,
    @Body() body: PostCommentDto,
  ) {
    return this.legalService.postComment(user.roleUID, orderId, body);
  }

  @Post('create-order')
  async createOrder(@User() user: User, @Body() body: CreateOrderDto) {
    return this.legalService.createOrder(user.roleUID, body);
  }

  @Get('orders')
  async getOrders(@User() user: User) {
    return this.legalService.getOrders(user.roleUID);
  }

  @Get('vacancies')
  async getVacancies(@User() user: User) {
    return this.legalService.getVacancies(user.roleUID);
  }

  @Post('create-vacancy')
  async createVacancy(@User() user: User, @Body() body: CreateVacancyDto) {
    return this.legalService.createVacancy(user.roleUID, body);
  }

  @Put('update-vacancy/:id')
  async updateVacancy(@Param('id') vacancyId: string, @Body() body: UpdateVacancyDto) {
    return this.legalService.updateVacancy(vacancyId, body);
  }
}
