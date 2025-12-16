import { BadRequestException, Injectable } from '@nestjs/common';
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

  async getInvestorById(id: string) {
    const investor = await this.databaseService.investor.findUnique({
      where: {
        id,
      },
    });

    if (!investor) {
      throw new BadRequestException({
        ok: false,
        message: {
          uz: 'Investor topilmadi',
        },
      });
    }

    return {
      ok: true,
      data: investor,
    };
  }
}
