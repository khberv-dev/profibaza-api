import { Module } from '@nestjs/common';
import InvestorRepository from './investor.repository';

@Module({
  controllers: [],
  providers: [InvestorRepository],
  exports: [InvestorRepository],
})
export default class InvestorModule {}
