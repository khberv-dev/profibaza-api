import { Injectable } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import { Prisma } from '@prisma/client';

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

  async findWorkerProfessions(id: string) {
    return this.databaseService.workerProfession.findMany({
      where: {
        workerId: id,
      },
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
}
