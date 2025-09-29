import { Body, Controller, Get, Post } from '@nestjs/common';
import ProfessionService from './profession.service';
import CreateProfessionDto from './dto/create-profession.dto';

@Controller('opt/professions')
export default class ProfessionController {
  constructor(private professionService: ProfessionService) {}

  @Get('')
  async getAll() {
    return this.professionService.getAll();
  }

  @Post('')
  async create(@Body() body: CreateProfessionDto) {
    return this.professionService.create(body);
  }
}
