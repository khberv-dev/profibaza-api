import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import { hashPassword } from '../../utils/hash';
import { randomString } from '../../utils/randomize';

@Injectable()
export default class InitService implements OnModuleInit {
  logger = new Logger(InitService.name);

  constructor(private databaseService: DatabaseService) {}

  async onModuleInit() {
    const admin = await this.databaseService.admin.findFirst();

    if (!admin) {
      this.logger.log('Admin not found. Creating one...');

      const adminPhone = '998000000000';
      const adminPassword = randomString(12);
      const passwordHash = await hashPassword(adminPassword);
      const user = await this.databaseService.user.create({
        data: {
          name: 'Admin',
          surname: 'Admin',
          middleName: 'Admin',
          phone: adminPhone,
          active: true,
          role: 'ADMIN',
          password: passwordHash,
        },
      });
      const admin = await this.databaseService.admin.create({
        data: {
          userId: user.id,
        },
      });

      this.logger.log(`Admin has been created: ${admin.id}`);
      this.logger.log(`Admin credentials: ${adminPhone}:${adminPassword}`);
    }
  }
}
