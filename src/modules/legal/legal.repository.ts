import { Injectable } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export default class LegalRepository {
  constructor(private databaseService: DatabaseService) {}

  async create(data: Prisma.LegalUncheckedCreateInput) {
    return this.databaseService.legal.create({ data });
  }

  async findByUserId(id: string) {
    return this.databaseService.legal.findFirst({
      where: {
        userId: id,
      },
    });
  }

  async findById(id: string) {
    return this.databaseService.legal.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: Prisma.LegalUpdateInput) {
    return this.databaseService.legal.update({
      where: {
        id: id,
      },
      data,
    });
  }
}
