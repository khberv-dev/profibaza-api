import { Injectable } from '@nestjs/common';
import OrderRepository from './order.repository';
import DatabaseService from '../../database/database.service';
import OrderFilterDto from './dto/order-filter.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export default class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private databaseService: DatabaseService,
  ) {}

  async findOrders(filter: OrderFilterDto) {
    const _radius = filter.radius / 111.32;
    const workerProfessionFilter: Prisma.WorkerProfessionWhereInput = {};

    if (filter.professions) {
      workerProfessionFilter.profession = {
        id: {
          in: filter.professions,
        },
      };
    }

    if (filter.minPrice && filter.maxPrice) {
      workerProfessionFilter.minPrice = {
        gte: filter.minPrice,
      };
      workerProfessionFilter.maxPrice = {
        lte: filter.maxPrice,
      };
    }

    if (filter.long && filter.lat && filter.radius) {
      workerProfessionFilter.locations = {
        some: {
          AND: [
            { longitude: { gte: filter.long - _radius } },
            { longitude: { lte: filter.long + _radius } },
            { latitude: { gte: filter.lat - _radius } },
            { latitude: { lte: filter.lat + _radius } },
          ],
        },
      };
    }

    let workerProfessions = await this.orderRepository.findOrders({
      where: workerProfessionFilter,
      include: {
        locations: {
          select: {
            longitude: true,
            latitude: true,
          },
        },
        worker: {
          select: {
            address1: true,
            address2: true,
            address3: true,
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

    if (filter.long && filter.lat && filter.radius) {
      workerProfessions = await Promise.all(
        workerProfessions.map(async (workerProfession) => {
          const locations = await this.databaseService.location.findMany({
            where: {
              workProfessionId: workerProfession.id,
            },
          });
          const worker = await this.databaseService.worker.findFirst({
            where: {
              id: workerProfession.workerId,
            },
          });

          let inArea = false;

          locations.forEach((location) => {
            const x = Math.pow(location.latitude - filter.lat, 2) + Math.pow(location.longitude - filter.long, 2);
            const _r = location.radius / 111.32;
            const r1 = Math.pow(_r + _radius, 2);
            const r2 = Math.pow(_r - _radius, 2);

            if (x <= r1 || x < r2) {
              inArea = true;
            }

            if (worker && filter.address1 && filter.address2 && filter.address3) {
              inArea =
                worker.address1 === filter.address1 &&
                worker.address2 === filter.address2 &&
                worker.address3 === filter.address3;
            }
          });

          return {
            ...workerProfession,
            inArea,
          };
        }),
      );

      workerProfessions = workerProfessions.filter((workerProfession) => workerProfession['inArea']);
    }

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
