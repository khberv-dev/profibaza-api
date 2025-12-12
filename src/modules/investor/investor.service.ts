import { Injectable } from '@nestjs/common';
import InvestorRepository from './investor.repository';

@Injectable()
export default class InvestorService {
  constructor(private investorRepository: InvestorRepository) {}

  async getMe(id: string) {
    const legal = await this.investorRepository.findById(id);

    return {
      ok: true,
      data: legal,
    };
  }
}
