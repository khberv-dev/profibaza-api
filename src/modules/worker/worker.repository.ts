import { BadRequestException, Injectable } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import { Prisma } from '@prisma/client';
import CreateExperienceDto from './dto/create-experience.dto';
import ScheduleDto from './dto/schedule.dto';

@Injectable()
export default class WorkerRepository {
  constructor(private databaseService: DatabaseService) {}

  async create(data: Prisma.WorkerUncheckedCreateInput) {
    return this.databaseService.worker.create({ data });
  }

  async findByUserId(id: string) {
    return this.databaseService.worker.findFirst({
      where: {
        userId: id,
      },
    });
  }

  async findWorkerProfessions(id: string, include: Prisma.WorkerProfessionInclude = {}) {
    return this.databaseService.workerProfession.findMany({
      where: {
        workerId: id,
      },
      include,
    });
  }

  async findWorkerProfession(id: string, include: Prisma.WorkerProfessionInclude = {}) {
    return this.databaseService.workerProfession.findFirst({
      where: {
        id,
      },
      include,
    });
  }

  async createWorkerProfession(data: Prisma.WorkerProfessionUncheckedCreateInput) {
    return this.databaseService.workerProfession.create({ data });
  }

  async updateWorkerProfession(id: string, data: Prisma.WorkerProfessionUncheckedUpdateInput) {
    return this.databaseService.workerProfession.update({
      where: { id },
      data,
    });
  }

  async updateWorkerProfessionSchedule(workerProfessionId: string, data: ScheduleDto) {
    const workerProfession = await this.databaseService.workerProfession.findFirst({
      where: { id: workerProfessionId },
      include: { schedule: true },
    });

    if (!workerProfession) {
      throw new BadRequestException();
    }

    if (workerProfession.schedule) {
      return this.databaseService.schedule.update({
        where: { id: workerProfession.schedule.id },
        data,
      });
    } else {
      return this.databaseService.schedule.create({
        data: {
          workerProfessionId,
          ...data,
        },
      });
    }
  }

  async createDocument(id: string, fileId: string) {
    return this.databaseService.document.create({
      data: {
        workerId: id,
        fileId: fileId,
        type: 'DIPLOMA',
      },
    });
  }

  async createDemo(workerProfessionId: string, fileId: string) {
    return this.databaseService.workerProfessionDemo.create({
      data: {
        workerProfessionId: workerProfessionId,
        fileId,
      },
    });
  }

  async getDemos(workerProfessionId: string) {
    return this.databaseService.workerProfessionDemo.findMany({
      where: {
        workerProfessionId: workerProfessionId,
      },
    });
  }

  async findNewOrders(workerId: string, include: Prisma.OrderInclude) {
    return this.databaseService.order.findMany({
      where: {
        startAt: null,
        workerProfession: {
          workerId,
        },
      },
      include,
    });
  }

  async findOrders(workerId: string, include: Prisma.OrderInclude, where: Prisma.OrderWhereInput) {
    return this.databaseService.order.findMany({
      where,
      include,
    });
  }

  async findOrderById(orderId: string) {
    return this.databaseService.order.findFirst({
      where: {
        id: orderId,
      },
    });
  }

  async updateOrderById(orderId: string, data: Prisma.OrderUncheckedUpdateInput) {
    return this.databaseService.order.update({
      where: { id: orderId },
      data,
    });
  }

  async addCommentFeedback(commentId: string, feedback: string) {
    return this.databaseService.comment.update({
      where: {
        id: commentId,
      },
      data: {
        feedback,
      },
    });
  }

  async getCommentById(commentId: string) {
    return this.databaseService.comment.findFirst({ where: { id: commentId } });
  }

  async createExperience(workerProfessionId: string, data: CreateExperienceDto) {
    return this.databaseService.experience.create({
      data: {
        workerProfessionId,
        ...data,
      },
    });
  }
}
