import { Injectable } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import { randomOTP, randomString } from '../../utils/randomize';
import axios from 'axios';
import { SMS_SERVICE_LOGIN, SMS_SERVICE_PASSWORD, SMS_SERVICE_URL } from '../../config';

@Injectable()
export default class OtpService {
  constructor(private database: DatabaseService) {}

  async sendOTP(phone: string) {
    const code = randomOTP();
    const body = {
      messages: [
        {
          recipient: phone,
          'message-id': randomString(10),
          sms: {
            originator: '3700',
            content: {
              text: `Profibaza kabinet uchun kod: ${code}`,
            },
          },
        },
      ],
    };

    await axios.post(SMS_SERVICE_URL, body, {
      auth: {
        username: SMS_SERVICE_LOGIN,
        password: SMS_SERVICE_PASSWORD,
      },
    });

    await this.database.otp.create({
      data: {
        phone,
        code,
      },
    });

    return code;
  }

  async verifyOTP(phone: string, code: string) {
    const otp = await this.database.otp.findFirst({
      where: {
        verified: false,
        phone,
      },
      orderBy: {
        sentAt: 'desc',
      },
    });

    if (!otp) {
      return null;
    }

    if (otp.code === code) {
      await this.database.otp.update({
        where: {
          id: otp.id,
        },
        data: {
          verified: true,
        },
      });

      return true;
    } else {
      return false;
    }
  }
}
