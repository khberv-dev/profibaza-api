import { Injectable } from '@nestjs/common';
import OrderRepository from './order.repository';

@Injectable()
export default class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async findOrders(minPrice: number, maxPrice: number, professions: string[]) {
    const orders = await this.orderRepository.findOrders({
      where: {
        minPrice: {
          gte: minPrice,
        },
        maxPrice: {
          lte: maxPrice,
        },
        profession: {
          id: {
            in: professions,
          },
        },
      },
      include: {
        worker: {
          include: {
            user: {
              select: {
                name: true,
                surname: true,
                middleName: true,
                avatar: true,
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
