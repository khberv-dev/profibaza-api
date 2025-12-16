import { Controller, Get, Param } from '@nestjs/common';
import InvestorService from './investor.service';

@Controller('opt/investor')
export default class InvestorController {
  constructor(private investorService: InvestorService) {}

  @Get('')
  getInvestors() {
    return this.investorService.getInvestors();
  }

  @Get(':id')
  getInvestorById(@Param('id') id: string) {
    return this.investorService.getInvestorById(id);
  }
}
