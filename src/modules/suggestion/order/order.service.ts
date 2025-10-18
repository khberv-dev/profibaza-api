import { Injectable } from '@nestjs/common';
import OrderRepository from './order.repository';

@Injectable()
export default class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async findOrders(
    minPrice: number,
    maxPrice: number,
    professions: string[],
    long: number,
    lat: number,
    radius: number,
  ) {
    let orders = await this.orderRepository.findOrders({
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
        locations: {
          some: {
            AND: [
              { longitude: { gte: long - radius } },
              { longitude: { lte: long + radius } },
              { latitude: { gte: lat - radius } },
              { latitude: { lte: lat + radius } },
            ],
          },
        },
      },
      include: {
        locations: {
          select: {
            longitude: true,
            latitude: true,
          },
        },
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

    orders = await Promise.all(
      orders.map(async (order) => {
        const activeOrdersCount = await this.orderRepository.countActiveOrders(order.id);

        return {
          isBusy: activeOrdersCount > 0,
          ...order,
        };
      }),
    );

    return {
      ok: true,
      data: orders,
    };
  }

  async getOrder(id: string) {
    const order = await this.orderRepository.getOrder(id);

    return {
      ok: true,
      data: order,
    };
  }
}
