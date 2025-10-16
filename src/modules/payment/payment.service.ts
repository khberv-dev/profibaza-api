import { BadRequestException, Injectable } from '@nestjs/common';
import CardPaymentDto from './dto/card-payment.dto';
import axios from 'axios';
import {
  PAYME_SUBSCRIBE_API_ID,
  PAYME_SUBSCRIBE_API_KEY,
  PAYME_SUBSCRIBE_API_URL,
} from '../../config';
import CardVerifyDto from './dto/card-verify.dto';
import DatabaseService from '../database/database.service';

@Injectable()
export default class PaymentService {
  constructor(private databaseService: DatabaseService) {}

  private async paymeRequest(data, key: boolean = false) {
    const requestId = Number(new Date().getTime().toString().slice(-6));
    let auth = PAYME_SUBSCRIBE_API_ID;

    if (key) {
      auth += ':' + PAYME_SUBSCRIBE_API_KEY;
    }

    return axios.post(
      PAYME_SUBSCRIBE_API_URL,
      {
        id: requestId,
        ...data,
      },
      {
        headers: {
          'X-Auth': auth,
          'Cache-Control': 'no-cache',
        },
      },
    );
  }

  async processCard(data: CardPaymentDto) {
    const cardResponse = await this.paymeRequest({
      method: 'cards.create',
      params: {
        card: {
          number: data.card,
          expire: data.expire,
        },
        save: false,
      },
    });

    if (cardResponse.status !== 200) {
      throw new BadRequestException({
        ok: false,
        message: {
          uz: 'Karta xato',
        },
      });
    }

    const cardToken = cardResponse.data['result']['card']['token'];

    const otpResponse = await this.paymeRequest({
      method: 'cards.get_verify_code',
      params: {
        token: cardToken,
      },
    });

    if (otpResponse.data['error']) {
      throw new BadRequestException({
        ok: false,
        message: {
          uz: "OTP jo'natishda xatolik",
        },
      });
    }

    const phone = otpResponse.data['result']['phone'];

    return {
      ok: true,
      data: {
        cardToken,
        phone,
      },
    };
  }

  async verifyCard(data: CardVerifyDto) {
    const transaction = await this.databaseService.transaction.findFirst({
      where: { id: data.invoice },
    });

    if (!transaction) {
      throw new BadRequestException({
        ok: false,
        message: {
          uz: 'Invoys topilmadi',
        },
      });
    }

    const otpVerifyResponse = await this.paymeRequest({
      method: 'cards.verify',
      params: {
        token: data.token,
        code: data.code,
      },
    });

    if (otpVerifyResponse.data['error']) {
      throw new BadRequestException({
        ok: false,
        message: {
          ru: otpVerifyResponse.data['error']['message'],
        },
      });
    }

    const createReceiptResponse = await this.paymeRequest(
      {
        method: 'receipts.create',
        params: {
          amount: transaction.amount * 100,
          account: {
            order_id: transaction.userId,
          },
        },
      },
      true,
    );

    const receiptId = createReceiptResponse.data['result']['receipt']['_id'];

    const payReceiptResponse = await this.paymeRequest(
      {
        method: 'receipts.pay',
        params: {
          id: receiptId,
          token: data.token,
        },
      },
      true,
    );

    if (payReceiptResponse.data['error']) {
      throw new BadRequestException({
        ok: false,
        message: {
          ru: payReceiptResponse.data['error']['message'],
        },
      });
    }

    await this.databaseService.user.update({
      where: {
        id: transaction.userId,
      },
      data: {
        balance: {
          increment: transaction.amount,
        },
      },
    });

    return {
      ok: true,
      message: {
        uz: "To'lov muvofaqqiyatli o'tdi",
      },
    };
  }
}
