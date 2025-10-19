import { Injectable } from '@nestjs/common';
import LegalRepository from './legal.repository';
import UpdateAddressDto from '../user/dto/update-address.dto';
import PostCommentDto from '../client/dto/post-comment.dto';
import UpdateProfileDto from './dto/update-profile.dto';
import CreateOrderDto from '../client/dto/create-order.dto';
import dayjs from 'dayjs';
import CreateVacancyDto from './dto/create-vacancy.dto';
import DatabaseService from '../database/database.service';
import UpdateVacancyDto from './dto/update-vacancy.dto';

@Injectable()
export default class LegalService {
  constructor(
    private legalRepository: LegalRepository,
    private databaseService: DatabaseService,
  ) {}

  async getMe(id: string) {
    const legal = await this.legalRepository.findById(id);

    return {
      ok: true,
      data: legal,
    };
  }

  async updateAddress(legalId: string, data: UpdateAddressDto) {
    await this.legalRepository.update(legalId, {
      address1: data.address1,
      address2: data.address2,
      address3: data.address3,
    });

    return {
      ok: true,
      message: {
        uz: "Ma'lumot yangilandi",
      },
    };
  }

  async postComment(legalId: string, orderId: string, data: PostCommentDto) {
    await this.legalRepository.createOrderComment(legalId, orderId, data.comment, data.rate);

    return {
      ok: true,
      message: {
        uz: 'Izoh qabul qilindi',
      },
    };
  }

  async updateProfile(legalId: string, data: UpdateProfileDto) {
    await this.legalRepository.update(legalId, {
      name: data.name,
    });

    return {
      ok: true,
      message: {
        uz: "Ma'lumot yangilandi",
      },
    };
  }

  async createOrder(legalId: string, orderData: CreateOrderDto) {
    const deadline = dayjs(orderData.deadline, 'YYYY-MM-DD');

    await this.legalRepository.createOrder({
      legalId,
      workerProfessionId: orderData.workerProfessionId,
      description: orderData.description,
      deadline: deadline.toDate(),
      budget: orderData.budget,
      address1: orderData.address1,
      address2: orderData.address2,
      address3: orderData.address3,
    });

    return {
      ok: true,
      message: {
        uz: "Buyurtma yaratildi va ustaga jo'natildi",
      },
    };
  }

  async getOrders(legalId: string) {
    const orders = await this.legalRepository.findOrdersByLegalId(legalId, {
      comments: true,
      workerProfession: {
        include: {
          worker: {
            select: {
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
        },
      },
    });

    return {
      ok: true,
      data: orders,
    };
  }

  async createVacancy(legalId: string, data: CreateVacancyDto) {
    await this.databaseService.vacancy.create({
      data: {
        legalId,
        title: data.title,
        salary: data.salary,
        description: data.description,
      },
    });

    return {
      ok: true,
      message: {
        uz: 'Vakansiya yaratildi',
      },
    };
  }

  async updateVacancy(vacancyId: string, data: UpdateVacancyDto) {
    await this.databaseService.vacancy.update({
      where: {
        id: vacancyId,
      },
      data,
    });

    return {
      ok: true,
      message: {
        uz: "Ma'lumot yangilandi",
      },
    };
  }

  async getVacancies(legalId: string) {
    const vacancies = await this.databaseService.vacancy.findMany({
      where: {
        legalId,
        deletedAt: null,
      },
    });

    return {
      ok: true,
      data: vacancies,
    };
  }

  async getVacancyById(vacancyId: string) {
    const vacancy = await this.databaseService.vacancy.findFirst({
      where: {
        id: vacancyId,
        deletedAt: null,
      },
    });

    if (!vacancy) {
      return {
        ok: false,
        message: {
          uz: "Ma'lumot topilmadi",
        },
      };
    }

    return {
      ok: true,
      data: vacancy,
    };
  }

  async getOffers(legalId: string) {
    const offers = await this.databaseService.offer.findMany({
      where: {
        vacancy: {
          legalId,
        },
      },
    });

    return {
      ok: true,
      data: offers,
    };
  }
}
