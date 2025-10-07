import { Injectable } from '@nestjs/common';
import ClientRepository from './client.repository';
import UpdateAddressDto from '../user/dto/update-address.dto';
import CreateOrderDto from './dto/create-order.dto';
import dayjs from 'dayjs';
import PostCommentDto from './dto/post-comment.dto';

@Injectable()
export default class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  async getMe(id: string) {
    const client = await this.clientRepository.findById(id);

    return {
      ok: true,
      data: client,
    };
  }

  async updateAddress(id: string, data: UpdateAddressDto) {
    await this.clientRepository.update(id, {
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

  async createOrder(clientId: string, orderData: CreateOrderDto) {
    const deadline = dayjs(orderData.deadline, 'YYYY-MM-DD');

    await this.clientRepository.createOrder({
      clientId,
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

  async getOrders(clientId: string) {
    const orders = await this.clientRepository.findOrdersByClientId(clientId, {
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

  async postComment(clientId: string, orderId: string, data: PostCommentDto) {
    await this.clientRepository.createOrderComment(clientId, orderId, data.comment, data.rate);

    return {
      ok: true,
      message: {
        uz: 'Izoh qabul qilindi',
      },
    };
  }
}
