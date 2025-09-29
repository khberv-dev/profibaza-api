import { Module } from '@nestjs/common';
import ClientRepository from './client.repository';
import ClientService from './client.service';
import ClientController from './client.controller';

@Module({
  controllers: [ClientController],
  providers: [ClientRepository, ClientService],
  exports: [ClientRepository, ClientService],
})
export default class ClientModule {}
