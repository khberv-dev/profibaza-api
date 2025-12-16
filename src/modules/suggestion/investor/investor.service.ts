import { Injectable } from '@nestjs/common';
import DatabaseService from '../../database/database.service';

@Injectable()
export default class InvestorService {
  constructor(private databaseService: DatabaseService) {}

  async getInvestors() {
    const investors = await this.databaseService.investor.findMany({
      include: {
        contacts: true,
        projects: {
          include: {
            employment: true,
          },
        },
      },
    });

    return {
      ok: true,
      data: investors,
    };
  }
}
