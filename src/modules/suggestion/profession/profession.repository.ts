import { Injectable } from '@nestjs/common';
import DatabaseService from '../../database/database.service';
import { ProfessionCategoryDto, ProfessionDto } from './dto/create-profession.dto';

@Injectable()
export default class ProfessionRepository {
  constructor(private databaseService: DatabaseService) {}

  async findProfessions() {
    return this.databaseService.professionCategory.findMany({
      include: {
        professions: true,
      },
    });
  }

  async createProfessions(professions: ProfessionDto[]) {
    return this.databaseService.profession.createMany({
      data: professions,
    });
  }

  async createCategory(data: ProfessionCategoryDto) {
    return this.databaseService.professionCategory.create({
      data,
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
