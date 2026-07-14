import { Injectable } from '@nestjs/common';
import TehnikumRepository from './tehnikum.repository';
import CreateTehnikumDto from './dto/create-tehnikum.dto';

@Injectable()
export default class TehnikumService {
  constructor(private tehnikumRepository: TehnikumRepository) {}

  async getAll() {
    const tehnikums = await this.tehnikumRepository.findAll();

    return {
      ok: true,
      data: tehnikums,
    };
  }

  async create(data: CreateTehnikumDto) {
    await this.tehnikumRepository.create(data);

    return {
      ok: true,
      message: {
        uz: 'Texnikum yaratildi',
      },
    };
  }
}
