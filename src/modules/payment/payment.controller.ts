import { Body, Controller, Post } from '@nestjs/common';
import PaymentService from './payment.service';
import CardPaymentDto from './dto/card-payment.dto';
import CardVerifyDto from './dto/card-verify.dto';

@Controller('pay')
export default class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('process-card')
  async processCard(@Body() body: CardPaymentDto) {
    return this.paymentService.processCard(body);
  }

  @Post('verify-card')
  async verifyCard(@Body() body: CardVerifyDto) {
    return this.paymentService.verifyCard(body);
  }
}
