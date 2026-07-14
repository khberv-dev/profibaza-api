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
import TehnikumRepository from './tehnikum/tehnikum.repository';
import TehnikumService from './tehnikum/tehnikum.service';
import TehnikumController from './tehnikum/tehnikum.controller';

@Module({
  controllers: [LocationController, ProfessionController, OrderController, InvestorController, TehnikumController],
  providers: [
    LocationService,
    LocationRepository,
    ProfessionService,
    ProfessionRepository,
    OrderService,
    OrderRepository,
    InvestorService,
    TehnikumService,
    TehnikumRepository,
  ],
  exports: [
    LocationService,
    LocationRepository,
    ProfessionService,
    ProfessionRepository,
    OrderService,
    OrderRepository,
    TehnikumService,
    TehnikumRepository,
  ],
})
export default class SuggestionModule {}
