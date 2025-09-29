import { Module } from '@nestjs/common';
import WorkerRepository from './worker.repository';
import WorkerService from './worker.service';
import WorkerController from './worker.controller';
import DocumentModule from '../document/document.module';

@Module({
  imports: [DocumentModule],
  controllers: [WorkerController],
  providers: [WorkerRepository, WorkerService],
  exports: [WorkerRepository, WorkerService],
})
export default class WorkerModule {}
