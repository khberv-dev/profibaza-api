import { Injectable } from '@nestjs/common';
import DatabaseService from '../../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export default class OrderRepository {
  constructor(private databaseService: DatabaseService) {}

  async findOrders(filter: Prisma.WorkerProfessionFindManyArgs) {
    return this.databaseService.workerProfession.findMany(filter);
  }

  async countActiveOrders(workerProfessionId: string) {
    return this.databaseService.order.count({
      where: {
        workerProfessionId,
        status: 'PROGRESS',
      },
    });
  }

  async getOrder(workerProfessionId: string) {
    return this.databaseService.workerProfession.findFirst({
      where: { id: workerProfessionId },
      include: {
        worker: {
          select: {
            user: {
              select: {
                surname: true,
                name: true,
                middleName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }
}
