import { Module } from '@nestjs/common';
import LegalRepository from './legal.repository';
import LegalService from './legal.service';
import LegalController from './legal.controller';

@Module({
  controllers: [LegalController],
  providers: [LegalRepository, LegalService],
  exports: [LegalRepository, LegalService],
})
export default class LegalModule {}
