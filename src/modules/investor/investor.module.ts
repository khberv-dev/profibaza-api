import { Module } from '@nestjs/common';
import InvestorRepository from './investor.repository';
import InvestorController from './investor.controller';
import InvestorService from './investor.service';

@Module({
  controllers: [InvestorController],
  providers: [InvestorRepository, InvestorService],
  exports: [InvestorRepository],
})
export default class InvestorModule {}
