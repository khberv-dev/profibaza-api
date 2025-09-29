import { Injectable } from '@nestjs/common';
import DatabaseService from '../database/database.service';

@Injectable()
export default class DocumentRepository {
  constructor(private databaseService: DatabaseService) {}

  async findByWorkerId(id: string) {
    return this.databaseService.document.findMany({
      where: {
        workerId: id,
      },
    });
  }

  async findByFileId(id: string) {
    return this.databaseService.document.findFirst({
      where: {
        fileId: id,
      },
    });
  }
}
