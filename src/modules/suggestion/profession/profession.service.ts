import { Injectable } from '@nestjs/common';
import ProfessionRepository from './profession.repository';
import CreateProfessionDto from './dto/create-profession.dto';

@Injectable()
export default class ProfessionService {
  constructor(private professionRepository: ProfessionRepository) {}

  async getAll() {
    const professions = await this.professionRepository.findProfessions();

    return {
      ok: true,
      data: professions,
    };
  }

  async create(data: CreateProfessionDto) {
    const category = await this.professionRepository.createCategory({
      nameUz: data.nameUz,
      nameRu: data.nameRu,
    });
    const professionsData = data.professions.map((profession) => {
      return {
        categoryId: category.id,
        ...profession,
      };
    });

    await this.professionRepository.createProfessions(professionsData);

    return {
      ok: true,
      message: {
        uz: 'Mutaxasislik yaratildi',
      },
    };
  }
}
