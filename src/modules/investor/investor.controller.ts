import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../../helpers/guards/jwt-auth.guard';
import InvestorService from './investor.service';
import { User } from '../../helpers/decorators/user.decorator';
import CreateContactDto from '../legal/dto/create-contact.dto';
import CreateVacancyDto from '../legal/dto/create-vacancy.dto';
import CreateProjectDto from './dto/create-project.dto';
import UpdateAddressDto from '../user/dto/update-address.dto';
import CreateOrderDto from '../client/dto/create-order.dto';
import OfferDto from '../legal/dto/offer.dto';
import PostCommentDto from '../client/dto/post-comment.dto';

@Controller('investor')
@UseGuards(JwtAuthGuard)
export default class InvestorController {
  constructor(private investorService: InvestorService) {}

  @Get('me')
  async getMe(@User() user: User) {
    return this.investorService.getMe(user.roleUID);
  }

  @Put('update-address')
  async updateAddress(@User() user: User, @Body() body: UpdateAddressDto) {
    return this.investorService.updateAddress(user.roleUID, body);
  }

  @Post('contacts')
  async addContact(@User() user: User, @Body() body: CreateContactDto) {
    return this.investorService.createContact(user.roleUID, body);
  }

  @Get('vacancies')
  async getVacancies(@User() user: User) {
    return this.investorService.getVacancies(user.roleUID);
  }

  @Get('vacancies/:id')
  async getVacancyById(@Param('id') id: string) {
    return this.investorService.getVacancyById(id);
  }

  @Post('create-vacancy')
  async createVacancy(@User() user: User, @Body() body: CreateVacancyDto) {
    return this.investorService.createVacancy(user.roleUID, body);
  }

  @Post('projects')
  async createProject(@User() user: User, @Body() body: CreateProjectDto) {
    return this.investorService.createProject(user.roleUID, body);
  }

  @Get('projects')
  async getProject(@User() user: User) {
    return this.investorService.getProjects(user.roleUID);
  }

  @Post('create-order')
  async createOrder(@User() user: User, @Body() body: CreateOrderDto) {
    return this.investorService.createOrder(user.roleUID, body);
  }

  @Get('orders')
  async getOrders(@User() user: User) {
    return this.investorService.getOrders(user.roleUID);
  }

  @Get('offers')
  async getOffers(@User() user: User) {
    return this.investorService.getOffers(user.roleUID);
  }

  @Post('decline-offer/:id')
  async declineOffer(@Param('id') offerId: string, @Body() body: OfferDto) {
    return this.investorService.declineOffer(offerId, body);
  }

  @Post('accept-offer/:id')
  async acceptOffer(@Param('id') offerId: string, @Body() body: OfferDto) {
    return this.investorService.acceptOffer(offerId, body);
  }

  @Post('comment/:id')
  async postComment(@User() user: User, @Param('id') orderId: string, @Body() body: PostCommentDto) {
    return this.investorService.postComment(user.roleUID, orderId, body);
  }
}
