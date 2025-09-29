import { Injectable } from '@nestjs/common';
import ClientRepository from './client.repository';
import UpdateAddressDto from '../user/dto/update-address.dto';

@Injectable()
export default class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  async getMe(id: string) {
    const client = await this.clientRepository.findById(id);

    return {
      ok: true,
      data: client,
    };
  }

  async updateAddress(id: string, data: UpdateAddressDto) {
    await this.clientRepository.update(id, {
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
