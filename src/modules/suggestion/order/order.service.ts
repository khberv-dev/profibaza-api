import { Injectable } from '@nestjs/common';
import OrderRepository from './order.repository';
import DatabaseService from '../../database/database.service';

@Injectable()
export default class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private databaseService: DatabaseService,
  ) {}

  async findOrders(
    minPrice: number,
    maxPrice: number,
    professions: string[],
    long: number,
    lat: number,
    radius: number,
  ) {
    const _radius = radius / 111.32;
    let workerProfessions = await this.orderRepository.findOrders({
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
              { longitude: { gte: long - _radius } },
              { longitude: { lte: long + _radius } },
              { latitude: { gte: lat - _radius } },
              { latitude: { lte: lat + _radius } },
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

    workerProfessions = await Promise.all(
      workerProfessions.map(async (workerProfession) => {
        const locations = await this.databaseService.location.findMany({
          where: {
            workProfessionId: workerProfession.id,
          },
        });

        let inArea = false;

        locations.forEach((location) => {
          const x = Math.pow(location.latitude - lat, 2) + Math.pow(location.longitude - long, 2);
          const _r = location.radius / 111.32;
          const r1 = Math.pow(_r + _radius, 2);
          const r2 = Math.pow(_r - _radius, 2);

          if (x <= r1 || x < r2) {
            inArea = true;
          }
        });

        return {
          ...workerProfession,
          inArea,
        };
      }),
    );

    workerProfessions = workerProfessions.filter((workerProfession) => workerProfession['inArea']);

    workerProfessions = await Promise.all(
      workerProfessions.map(async (order) => {
        const activeOrdersCount = await this.orderRepository.countActiveOrders(order.id);

        return {
          isBusy: activeOrdersCount > 0,
          ...order,
        };
      }),
    );

    return {
      ok: true,
      data: workerProfessions,
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
