import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export default class DatabaseService extends PrismaClient implements OnModuleInit {
  logger = new Logger('Database');

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Connected');
    } catch (e) {
      this.logger.error('Database error: ' + e);
    }
  }
}
