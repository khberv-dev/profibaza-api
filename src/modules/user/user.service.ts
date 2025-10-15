import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import UserRepository from './user.repository';
import UpdatePasswordDto from './dto/update-password.dto';
import { hashPassword, verifyPassword } from '../../utils/hash';
import UpdateUserDto from '../auth/dto/update-user.dto';
import RequestResetPasswordDto from './dto/request-reset-password.dto';
import ResetPasswordDto from './dto/reset-password.dto';
import dayjs from 'dayjs';
import * as path from 'node:path';
import * as process from 'node:process';
import DatabaseService from '../database/database.service';

@Injectable()
export default class UserService {
  constructor(
    private userRepository: UserRepository,
    private databaseService: DatabaseService,
  ) {}

  async getMe(id: string) {
    const user = (await this.userRepository.findById(id))!;

    const { password, ...userData } = user;

    return {
      ok: true,
      data: userData,
    };
  }

  async updatePassword(userId: string, data: UpdatePasswordDto) {
    const user = await this.userRepository.findById(userId);
    const validPassword = await verifyPassword(data.oldPassword, user!.password);

    if (!validPassword) {
      throw new BadRequestException({
        ok: false,
        message: {
          uz: 'Parol xato',
        },
      });
    }

    const passwordHash = await hashPassword(data.password);

    await this.userRepository.updateUser(userId, { password: passwordHash });

    return {
      ok: true,
      message: {
        uz: 'Parol yangilandi',
      },
    };
  }

  async update(userId: string, data: UpdateUserDto) {
    await this.userRepository.updateUser(userId, data);

    return {
      ok: true,
      message: {
        uz: "Ma'lumot yangilandi",
      },
    };
  }

  async requestResetPassword(data: RequestResetPasswordDto) {
    const user = await this.userRepository.findByPhone(data.phone);

    if (!user) {
      throw new BadRequestException({
        ok: false,
        message: {
          uz: 'Telefon raqam topilmadi',
        },
      });
    }

    const code = '00000';

    // TODO(SEND OTP VIA SMS)

    const request = await this.userRepository.createPasswordResetRequest(data.phone, code);

    return {
      ok: true,
      data: {
        request_id: request.id,
      },
    };
  }

  async resetPassword(data: ResetPasswordDto) {
    const maximumExpirationDate = dayjs().add(10, 'minutes');
    const request = await this.userRepository.findResetPasswordRequest(data.requestId);

    if (!request) {
      throw new BadRequestException({
        ok: false,
        message: {
          uz: "So'rov topilmadi",
        },
      });
    }

    const requestExpirationDate = dayjs(request.expires_at);

    if (requestExpirationDate.isAfter(maximumExpirationDate)) {
      throw new BadRequestException({
        ok: false,
        message: {
          uz: "So'rov muddati tugagan",
        },
      });
    }

    if (data.code !== request.code) {
      throw new BadRequestException({
        ok: false,
        message: {
          uz: 'Kod xato',
        },
      });
    }

    const user = await this.userRepository.findByPhone(request.phone);

    if (!user) {
      throw new BadRequestException({
        ok: false,
        message: {
          uz: 'Telefon raqam topilmadi',
        },
      });
    }

    const passwordHash = await hashPassword(data.password);

    await this.userRepository.updateUser(user.id, { password: passwordHash });

    return {
      ok: true,
      message: {
        uz: 'Parol yangilandi',
      },
    };
  }

  async updateAvatar(userId: string, fileName: string) {
    await this.userRepository.updateUser(userId, { avatar: fileName });

    return {
      ok: true,
      message: {
        uz: 'Avatar yangilandi',
      },
    };
  }

  async getAvatar(userId: string) {
    const user = await this.userRepository.findById(userId);
    const fileName = user?.avatar;

    if (!fileName) {
      throw new NotFoundException();
    } else {
      return path.join(process.cwd(), 'files', 'avatar', fileName);
    }
  }

  async requestActivation(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new BadRequestException({
        ok: false,
        message: {
          uz: 'Foydalanuvchi topilmadi',
        },
      });
    }

    if (user.active) {
      throw new BadRequestException({
        ok: false,
        message: {
          uz: 'Foydalanuvchi allaqachon faol holatda',
        },
      });
    }

    const transaction = await this.databaseService.transaction.create({
      data: {
        userId,
        amount: 5000,
        description: 'Akkaunt faollashtirish uchun',
      },
    });

    return {
      ok: true,
      data: {
        transactionId: transaction.id,
      },
    };
  }

  async processActivation(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (user && user.active) {
      throw new BadRequestException({
        ok: false,
        message: {
          uz: 'Foydalanuvchi allaqachon faollashtirilgan',
        },
      });
    }

    if (user && user.balance < 5000) {
      throw new BadRequestException({
        ok: false,
        message: {
          uz: "Hisobda yetarli mablag' mavjud emas",
        },
      });
    }

    await this.databaseService.user.update({
      where: { id: userId },
      data: {
        active: true,
        balance: {
          decrement: 5000,
        },
      },
    });

    return {
      ok: true,
      message: {
        uz: 'Foydalanuvchi faollashtirildi',
      },
    };
  }
}
