import { BadRequestException, Injectable } from '@nestjs/common';
import LoginDto from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import UserRepository from '../user/user.repository';
import RegisterDto, { UserRole } from './dto/register.dto';
import { hashPassword, verifyPassword } from '../../utils/hash';
import ClientRepository from '../client/client.repository';
import LegalRepository from '../legal/legal.repository';
import WorkerRepository from '../worker/worker.repository';
import { JwtPayload } from '../../helpers/jwt/jwt.strategy';
import dayjs from 'dayjs';

@Injectable()
export default class AuthService {
  constructor(
    private jwt: JwtService,
    private userRepository: UserRepository,
    private clientRepository: ClientRepository,
    private legalRepository: LegalRepository,
    private workerRepository: WorkerRepository,
  ) {}
  async validate(data: LoginDto): Promise<JwtPayload | null> {
    const user = await this.userRepository.findByPhone(data.phone);
    let roleUID: string | undefined = undefined;

    if (!user) {
      return null;
    }

    switch (user.role) {
      case 'CLIENT':
        roleUID = (await this.clientRepository.findByUserId(user.id))?.id;
        break;

      case 'LEGAL':
        roleUID = (await this.legalRepository.findByUserId(user.id))?.id;
        break;

      case 'WORKER':
        roleUID = (await this.workerRepository.findByUserId(user.id))?.id;
        break;

      case 'ADMIN':
        roleUID = (await this.userRepository.findAdminByUserId(user.id))?.id;
        break;
    }

    const validPassword = await verifyPassword(data.password, user.password);

    if (!validPassword) {
      return null;
    }

    return {
      sub: user.id,
      role: user.role,
      active: user.active,
      roleUID: roleUID,
    };
  }

  async login(data: LoginDto) {
    const user = await this.validate(data);

    if (!user) {
      throw new BadRequestException({
        ok: false,
        message: {
          uz: 'Raqam yoki parol xato',
        },
      });
    }

    const token = this.jwt.sign(user);

    return {
      ok: true,
      token,
      active: user.active,
      role: user.role,
    };
  }

  async register(data: RegisterDto) {
    if (await this.userRepository.findByPhone(data.phone)) {
      throw new BadRequestException({
        ok: false,
        message: {
          uz: 'Boshqa telefon raqam kiriting',
        },
      });
    }

    if (data.email && (await this.userRepository.findByEmail(data.email))) {
      throw new BadRequestException({
        ok: false,
        message: {
          uz: 'Boshqa email kiriting',
        },
      });
    }

    const passwordHash = await hashPassword(data.password);
    const birthdayDate = dayjs(data.birthday, 'YYYY-MM-DD').toDate();

    const user = await this.userRepository.create({
      name: data.name,
      surname: data.surname,
      middleName: data.middleName,
      gender: data.gender,
      birthday: birthdayDate,
      phone: data.phone,
      email: data.email,
      role: data.role,
      password: passwordHash,
    });

    if (data.role == UserRole.CLIENT) {
      await this.clientRepository.create({
        userId: user.id,
        address1: data.address1,
        address2: data.address2,
        address3: data.address3,
      });
    }

    if (data.role == UserRole.LEGAL) {
      await this.legalRepository.create({
        userId: user.id,
        address1: data.address1,
        address2: data.address2,
        address3: data.address3,
      });
    }

    if (data.role == UserRole.WORKER) {
      await this.workerRepository.create({
        userId: user.id,
        address1: data.address1,
        address2: data.address2,
        address3: data.address3,
      });
    }

    return { ok: true };
  }
}
