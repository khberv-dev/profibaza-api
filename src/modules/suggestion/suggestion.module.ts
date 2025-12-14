import { Module } from '@nestjs/common';
import LocationController from './location/location.controller';
import LocationService from './location/location.service';
import LocationRepository from './location/location.repository';
import ProfessionRepository from './profession/profession.repository';
import ProfessionService from './profession/profession.service';
import ProfessionController from './profession/profession.controller';
import OrderController from './order/order.controller';
import OrderService from './order/order.service';
import OrderRepository from './order/order.repository';
import InvestorService from './investor/investor.service';
import InvestorController from './investor/investor.controller';

@Module({
  controllers: [LocationController, ProfessionController, OrderController, InvestorController],
  providers: [
    LocationService,
    LocationRepository,
    ProfessionService,
    ProfessionRepository,
    OrderService,
    OrderRepository,
    InvestorService,
  ],
  exports: [
    LocationService,
    LocationRepository,
    ProfessionService,
    ProfessionRepository,
    OrderService,
    OrderRepository,
  ],
})
export default class SuggestionModule {}
