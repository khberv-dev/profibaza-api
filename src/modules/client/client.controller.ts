import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import UpdateAddressDto from '../user/dto/update-address.dto';
import ClientService from './client.service';
import { User } from '../../helpers/decorators/user.decorator';
import JwtAuthGuard from '../../helpers/guards/jwt-auth.guard';

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
}
