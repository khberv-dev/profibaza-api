import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import WorkerRepository from './worker.repository';
import CreateWorkerProfessionDto from './dto/create-worker-profession.dto';
import DocumentRepository from '../document/document.repository';
import path from 'node:path';
import process from 'node:process';
import UpdateWorkerProfessionDto from './dto/update-worker-profession.dto';
import CommentFeedbackDto from './dto/comment-feedback.dto';
import GetOrdersDto from './dto/get-orders.dto';
import { Prisma } from '@prisma/client';
import CreateExperienceDto from './dto/create-experience.dto';

@Injectable()
export default class WorkerService {
  constructor(
    private workerRepository: WorkerRepository,
    private documentRepository: DocumentRepository,
  ) {}

  async getWorkerProfessions(id: string) {
    const workerProfessions = await this.workerRepository.findWorkerProfessions(id, {
      demos: true,
      profession: true,
      orders: true,
      schedule: true,
      locations: true,
      experience: true,
    });

    return {
      ok: true,
      data: workerProfessions,
    };
  }

  async createWorkerProfession(id: string, data: CreateWorkerProfessionDto) {
    const locationsData = data.locations.map((location) => {
      return {
        longitude: Number.parseFloat(location.longitude),
        latitude: Number.parseFloat(location.latitude),
        radius: location.radius,
      };
    });

    await this.workerRepository.createWorkerProfession({
      workerId: id,
      professionId: data.professionId,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      inventory: data.inventory,
      competitions: data.competitions,
      schedule: {
        create: data.schedule,
      },
      locations: {
        create: locationsData,
      },
    });

    return {
      ok: true,
      message: {
        uz: "Mutaxasislik qo'shildi",
      },
    };
  }

  async createDocument(id: string, fileId: string) {
    await this.workerRepository.createDocument(id, fileId);

    return {
      ok: true,
      message: {
        uz: "Hujjat qo'shildi",
      },
    };
  }

  async createDemo(workerProfessionId: string, fileId: string) {
    await this.workerRepository.createDemo(workerProfessionId, fileId);

    return {
      ok: true,
      message: {
        uz: "Fayl qo'shildi",
      },
    };
  }

  async getDemos(workerProfessionId: string) {
    const demos = await this.workerRepository.getDemos(workerProfessionId);

    return {
      ok: true,
      data: demos,
    };
  }

  async getDocuments(id: string) {
    const documents = await this.documentRepository.findByWorkerId(id);

    return {
      ok: true,
      data: documents,
    };
  }

  async getDocument(fileId: string) {
    const document = await this.documentRepository.findByFileId(fileId);
    const fileName = document?.fileId;

    if (!fileName) {
      throw new NotFoundException();
    } else {
      return path.join(process.cwd(), 'files', 'document', fileName);
    }
  }

  async getDemo(fileId: string) {
    const demo = await this.documentRepository.findByFileId(fileId);
    const fileName = demo?.fileId;

    if (!fileName) {
      throw new NotFoundException();
    } else {
      return path.join(process.cwd(), 'files', 'demo', fileName);
    }
  }

  async updateProfession(workerProfessionId: string, data: UpdateWorkerProfessionDto) {
    const { schedule, ...workerProfessionData } = data;
    const workerProfession = await this.workerRepository.findWorkerProfession(workerProfessionId);

    await this.workerRepository.updateWorkerProfessionSchedule(workerProfession!.id, schedule);
    await this.workerRepository.updateWorkerProfession(workerProfessionId, workerProfessionData);
  }

  async getNewOrders(workerId: string) {
    const orders = await this.workerRepository.findNewOrders(workerId, {
      client: {
        select: {
          address1: true,
          address2: true,
          address3: true,
          user: {
            select: {
              surname: true,
              name: true,
              middleName: true,
              phone: true,
              avatar: true,
            },
          },
        },
      },
      legal: true,
    });

    return {
      ok: true,
      data: orders,
    };
  }

  async getOrders(workerId: string, filter: GetOrdersDto) {
    const orderFilter: Prisma.OrderWhereInput = {
      workerProfession: {
        workerId,
      },
    };

    if (filter.status) {
      orderFilter.status = filter.status;
    }

    const orders = await this.workerRepository.findOrders(
      workerId,
      {
        client: {
          select: {
            address1: true,
            address2: true,
            address3: true,
            user: {
              select: {
                surname: true,
                name: true,
                middleName: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
        legal: {
          select: {
            address1: true,
            address2: true,
            address3: true,
            user: {
              select: {
                surname: true,
                name: true,
                middleName: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
        comments: true,
      },
      orderFilter,
    );

    return {
      ok: true,
      data: orders,
    };
  }

  async acceptOrder(orderId: string) {
    const order = await this.workerRepository.findOrderById(orderId);
    const now = new Date();

    if (!order) {
      throw new BadRequestException({
        ok: false,
        message: {
          uz: 'Buyurtma topilmadi',
        },
      });
    }

    await this.workerRepository.updateOrderById(orderId, {
      status: 'PROGRESS',
      startAt: now,
    });

    return {
      ok: true,
      message: 'Buyurtma qabul qilindi',
    };
  }

  async rejectOrder(orderId: string) {
    const order = await this.workerRepository.findOrderById(orderId);
    const now = new Date();

    if (!order) {
      throw new BadRequestException({
        ok: false,
        message: {
          uz: 'Buyurtma topilmadi',
        },
      });
    }

    await this.workerRepository.updateOrderById(orderId, {
      status: 'REJECTED',
      rejectedAt: now,
    });

    return {
      ok: true,
      message: 'Buyurtma bekor qilindi',
    };
  }

  async postCommentFeedback(commentId: string, data: CommentFeedbackDto) {
    const comment = await this.workerRepository.getCommentById(commentId);

    if (!comment || comment.feedback) {
      throw new BadRequestException({
        ok: false,
        message: {
          uz: 'Izoh topilmadi',
        },
      });
    }

    await this.workerRepository.addCommentFeedback(commentId, data.feedback);

    return {
      ok: true,
      message: {
        uz: 'Izoh qoldirildi',
      },
    };
  }

  async createExperience(workerProfessionExperienceId: string, data: CreateExperienceDto) {
    await this.workerRepository.createExperience(workerProfessionExperienceId, data);

    return {
      ok: true,
      message: {
        uz: "Qo'shildi",
      },
    };
  }
}
