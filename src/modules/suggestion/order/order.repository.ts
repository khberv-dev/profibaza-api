import { Injectable } from '@nestjs/common';
import DatabaseService from '../../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export default class OrderRepository {
  constructor(private databaseService: DatabaseService) {}

  async findOrders(filter: Prisma.WorkerProfessionFindManyArgs) {
    return this.databaseService.workerProfession.findMany(filter);
  }
}
