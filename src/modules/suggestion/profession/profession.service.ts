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
    await this.professionRepository.createProfession(data.nameUz, data.nameRu);

    return {
      ok: true,
      message: {
        uz: 'Mutaxasislik yaratildi',
      },
    };
  }
}
