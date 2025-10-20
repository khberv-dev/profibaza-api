import { Injectable } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';

@Injectable()
export default class UserRepository {
  constructor(private database: DatabaseService) {}

  findById(id: string) {
    return this.database.user.findFirst({ where: { id } });
  }

  findAdminByUserId(id: string) {
    return this.database.admin.findFirst({
      where: {
        userId: id,
      },
    });
  }

  findByPhone(phone: string) {
    return this.database.user.findFirst({ where: { phone } });
  }

  findByEmail(email: string) {
    return this.database.user.findFirst({ where: { email } });
  }

  create(user: Prisma.UserCreateInput) {
    return this.database.user.create({ data: user });
  }

  findAll() {
    return this.database.user.findMany();
  }

  updateUser(id: string, data: Prisma.UserUpdateInput) {
    return this.database.user.update({
      where: { id },
      data,
    });
  }

  createPasswordResetRequest(phone: string, code: string) {
    const expireDate = dayjs().add(10, 'minutes').toDate();

    return this.database.resetPasswordRequest.create({
      data: {
        phone,
        code,
        expires_at: expireDate,
      },
    });
  }

  findResetPasswordRequest(id: string) {
    return this.database.resetPasswordRequest.findFirst({ where: { id } });
  }
}
