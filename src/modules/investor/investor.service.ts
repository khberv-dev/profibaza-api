import { Injectable } from '@nestjs/common';
import InvestorRepository from './investor.repository';
import CreateContactDto from '../legal/dto/create-contact.dto';
import DatabaseService from '../database/database.service';
import CreateVacancyDto from '../legal/dto/create-vacancy.dto';
import UpdateVacancyDto from '../legal/dto/update-vacancy.dto';
import CreateProjectDto from './dto/create-project.dto';

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
        return {
          projectId: project.id,
          ...e,
        };
      }),
    });
  }
}
