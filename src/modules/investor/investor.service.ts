import { Injectable } from '@nestjs/common';
import InvestorRepository from './investor.repository';
import CreateContactDto from '../legal/dto/create-contact.dto';
import DatabaseService from '../database/database.service';
import CreateVacancyDto from '../legal/dto/create-vacancy.dto';
import UpdateVacancyDto from '../legal/dto/update-vacancy.dto';
import CreateProjectDto from './dto/create-project.dto';
import dayjs from 'dayjs';
import UpdateAddressDto from '../user/dto/update-address.dto';
import CreateOrderDto from '../client/dto/create-order.dto';
import OfferDto from '../legal/dto/offer.dto';

@Injectable()
export default class InvestorService {
  constructor(
    private investorRepository: InvestorRepository,
    private databaseService: DatabaseService,
  ) {}

  async getMe(id: string) {
    const legal = await this.investorRepository.findById(id);

    return {
      ok: true,
      data: legal,
    };
  }

  async createContact(investorId: string, data: CreateContactDto) {
    await this.databaseService.contact.create({
      data: {
        investorId,
        contact: data.contact,
        person: data.person,
        type: data.type,
      },
    });

    return {
      ok: true,
      message: {
        uz: "Kontakt qo'shildi",
      },
    };
  }

  async createVacancy(investorId: string, data: CreateVacancyDto) {
    await this.databaseService.vacancy.create({
      data: {
        investorId,
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

  async getVacancies(investorId: string) {
    const vacancies = await this.databaseService.vacancy.findMany({
      where: {
        investorId,
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

  async createProject(investorId: string, data: CreateProjectDto) {
    const project = await this.databaseService.project.create({
      data: {
        investorId,
        capacity: data.capacity,
        description: data.description,
        partners: data.partners,
      },
    });

    await this.databaseService.projectEmployment.createMany({
      data: data.employment.map((e) => {
        const { startDate, endDate } = e;

        return {
          ...e,
          projectId: project.id,
          startDate: dayjs(startDate, 'YYYY-MM-DD').toDate(),
          endDate: dayjs(endDate, 'YYYY-MM-DD').toDate(),
        };
      }),
    });

    return {
      ok: true,
      message: {
        uz: 'Loyiha yaratildi',
      },
    };
  }

  async getProjects(investorId: string) {
    const projects = await this.databaseService.project.findMany({
      where: {
        investorId,
      },
      include: {
        employment: true,
      },
    });

    return {
      ok: true,
      data: projects,
    };
  }

  async updateAddress(investorId: string, data: UpdateAddressDto) {
    await this.databaseService.investor.update({
      where: {
        id: investorId,
      },
      data: {
        address1: data.address1,
        address2: data.address2,
        address3: data.address3,
      },
    });

    return {
      ok: true,
      message: {
        uz: "Ma'lumot yangilandi",
      },
    };
  }

  async createOrder(investorId: string, orderData: CreateOrderDto) {
    const deadline = dayjs(orderData.deadline, 'YYYY-MM-DD');

    await this.investorRepository.createOrder({
      investorId,
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

  async getOrders(investorId: string) {
    const orders = await this.investorRepository.findOrdersByInvestorId(investorId, {
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
  }

  async getOffers(investorId: string) {
    const offers = await this.databaseService.offer.findMany({
      where: {
        vacancy: {
          investorId,
        },
      },
      include: {
        vacancy: {
          select: {
            legal: {
              select: {
                name: true,
              },
            },
            title: true,
            description: true,
            salary: true,
          },
        },
        workerProfession: {
          include: {
            experience: true,
            profession: {
              select: {
                nameUz: true,
                nameRu: true,
              },
            },
            worker: {
              select: {
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
        },
      },
    });

    return {
      ok: true,
      data: offers,
    };
  }

  async declineOffer(offerId: string, data: OfferDto) {
    await this.databaseService.offer.update({
      where: {
        id: offerId,
      },
      data: {
        status: 'DECLINED',
        message: data.message,
      },
    });

    return {
      ok: true,
      message: {
        uz: 'Taklif rad etildi',
      },
    };
  }

  async acceptOffer(offerId: string, data: OfferDto) {
    await this.databaseService.offer.update({
      where: {
        id: offerId,
      },
      data: {
        status: 'ACCEPTED',
        message: data.message,
      },
    });

    return {
      ok: true,
      message: {
        uz: 'Taklif qabul qilindi',
      },
    };
  }
}
