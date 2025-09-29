import { Injectable } from '@nestjs/common';
import LegalRepository from './legal.repository';
import UpdateAddressDto from '../user/dto/update-address.dto';

@Injectable()
export default class LegalService {
  constructor(private legalRepository: LegalRepository) {}

  async getMe(id: string) {
    const legal = await this.legalRepository.findById(id);

    return {
      ok: true,
      data: legal,
    };
  }

  async updateAddress(legalId: string, data: UpdateAddressDto) {
    await this.legalRepository.update(legalId, {
      address1: data.address1,
      address2: data.address2,
      address3: data.address3,
    });

    return {
      ok: true,
      message: {
        uz: "Ma'lumot yangilandi",
      },
    };
  }
}
