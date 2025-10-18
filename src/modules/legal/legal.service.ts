import { Injectable } from '@nestjs/common';
import LegalRepository from './legal.repository';
import UpdateAddressDto from '../user/dto/update-address.dto';
import PostCommentDto from '../client/dto/post-comment.dto';
import UpdateProfileDto from './dto/update-profile.dto';
import CreateOrderDto from '../client/dto/create-order.dto';
import dayjs from 'dayjs';

@Injectable()
export default class LegalService {
  constructor(private legalRepository: LegalRepository) {}

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

  async postComment(clientId: string, orderId: string, data: PostCommentDto) {
    await this.legalRepository.createOrderComment(clientId, orderId, data.comment, data.rate);

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
}
