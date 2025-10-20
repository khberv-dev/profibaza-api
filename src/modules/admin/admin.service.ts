import { Injectable } from '@nestjs/common';
import DatabaseService from '../database/database.service';

@Injectable()
export default class AdminService {
  constructor(private databaseService: DatabaseService) {}

  async getOverallStats() {
    const usersCount = await this.databaseService.user.count();
    const clientsCount = await this.databaseService.client.count();
    const workersCount = await this.databaseService.worker.count();
    const ordersCount = await this.databaseService.order.count();
    const finishedOrdersCount = await this.databaseService.order.count({
      where: {
        status: 'DONE',
      },
    });

    return {
      ok: true,
      data: {
        usersCount,
        clientsCount,
        workersCount,
        ordersCount,
        finishedOrdersCount,
      },
    };
  }

  async getInvoices(page: number, limit: number) {
    const [invoices, count] = await Promise.all([
      this.databaseService.transaction.findMany({
        skip: limit * (page - 1),
        take: limit,
      }),
      this.databaseService.transaction.count(),
    ]);

    return {
      ok: true,
      data: invoices,
      meta: {
        total: count,
        pages: Math.ceil(count / limit),
      },
    };
  }
}
