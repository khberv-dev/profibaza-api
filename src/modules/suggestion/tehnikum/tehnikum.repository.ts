import { Injectable } from '@nestjs/common';
import DatabaseService from '../../database/database.service';
import CreateTehnikumDto from './dto/create-tehnikum.dto';

@Injectable()
export default class TehnikumRepository {
  constructor(private databaseService: DatabaseService) {}

  async findAll() {
    return this.databaseService.tehnikum.findMany();
  }

  async findById(id: string) {
    return this.databaseService.tehnikum.findFirst({ where: { id } });
  }

  async create(data: CreateTehnikumDto) {
    return this.databaseService.tehnikum.create({ data });
  }
}
