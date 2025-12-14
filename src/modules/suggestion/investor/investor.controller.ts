import { Controller, Get } from '@nestjs/common';
import InvestorService from './investor.service';

@Controller('opt/investor')
export default class InvestorController {
  constructor(private investorService: InvestorService) {}

  @Get('')
  getInvestors() {
    return this.investorService.getInvestors();
  }
}
