import { Injectable } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export default class InvestorRepository {
  constructor(private databaseService: DatabaseService) {}

  async create(data: Prisma.InvestorUncheckedCreateInput) {
    return this.databaseService.investor.create({ data });
  }

  async findByUserId(id: string) {
    return this.databaseService.investor.findFirst({
      where: {
        userId: id,
      },
    });
  }

  async findById(id: string) {
    return this.databaseService.investor.findFirst({
      where: {
        id,
      },
      include: {
        contacts: true,
      },
    });
  }

  async update(id: string, data: Prisma.InvestorUpdateInput) {
    return this.databaseService.investor.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async createOrderComment(investorId: string, orderId: string, comment: string, rating: number) {
    return this.databaseService.comment.create({
      data: {
        investorId,
        orderId,
        rating,
        text: comment,
      },
    });
  }

  async createOrder(data: Prisma.OrderUncheckedCreateInput) {
    return this.databaseService.order.create({ data });
  }

  async findOrdersByInvestorId(investorId: string, include: Prisma.OrderInclude = {}) {
    return this.databaseService.order.findMany({
      where: {
        investorId,
      },
      include,
    });
  }
}
