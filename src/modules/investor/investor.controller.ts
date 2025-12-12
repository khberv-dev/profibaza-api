import { Controller, Get, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../../helpers/guards/jwt-auth.guard';
import InvestorService from './investor.service';
import { User } from '../../helpers/decorators/user.decorator';

@Controller('investor')
@UseGuards(JwtAuthGuard)
export default class InvestorController {
  constructor(private investorService: InvestorService) {}

  @Get('me')
  async getMe(@User() user: User) {
    return this.investorService.getMe(user.roleUID);
  }
}
