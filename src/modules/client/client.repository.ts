import { Injectable } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export default class ClientRepository {
  constructor(private databaseService: DatabaseService) {}

  async create(data: Prisma.ClientUncheckedCreateInput) {
    return this.databaseService.client.create({ data });
  }

  async update(id: string, data: Prisma.ClientUncheckedUpdateInput) {
    return this.databaseService.client.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async findByUserId(id: string) {
    return this.databaseService.client.findFirst({
      where: {
        userId: id,
      },
    });
  }

  async findById(id: string) {
    return this.databaseService.client.findFirst({
      where: {
        id,
      },
    });
  }
}
