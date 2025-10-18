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

  async createOrderComment(clientId: string, orderId: string, comment: string, rating: number) {
    return this.databaseService.comment.create({
      data: {
        clientId,
        orderId,
        rating,
        text: comment,
      },
    });
  }

  async createOrder(data: Prisma.OrderUncheckedCreateInput) {
    return this.databaseService.order.create({ data });
  }

  async findOrdersByLegalId(legalId: string, include: Prisma.OrderInclude = {}) {
    return this.databaseService.order.findMany({
      where: {
        legalId,
      },
      include,
    });
  }
}
