import { Injectable } from '@nestjs/common';
import DatabaseService from '../../database/database.service';

@Injectable()
export default class ProfessionRepository {
  constructor(private databaseService: DatabaseService) {}

  async findProfessions() {
    return this.databaseService.profession.findMany();
  }

  async createProfession(nameUz: string, nameRu: string) {
    return this.databaseService.profession.create({
      data: {
        nameUz,
        nameRu,
      },
    });
  }

  async deleteProfession(id: string) {
    return this.databaseService.profession.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
