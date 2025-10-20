import { Module } from '@nestjs/common';
import AdminController from './admin.controller';
import InitService from './init.service';
import AdminService from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [InitService, AdminService],
})
export default class AdminModule {}
