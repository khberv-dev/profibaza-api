import { Body, Controller, Get, Put } from '@nestjs/common';
import LegalService from './legal.service';
import { User } from '../../helpers/decorators/user.decorator';
import UpdateAddressDto from '../user/dto/update-address.dto';

@Controller('legal')
export default class LegalController {
  constructor(private legalService: LegalService) {}

  @Get('me')
  async getMe(@User() user: User) {
    return this.legalService.getMe(user.roleUID);
  }

  @Put('update-address')
  async updateAddress(@User() user: User, @Body() body: UpdateAddressDto) {
    return this.legalService.updateAddress(user.roleUID, body);
  }
}
