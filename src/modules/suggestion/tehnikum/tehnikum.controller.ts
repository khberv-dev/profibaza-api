import { Body, Controller, Get, Post } from '@nestjs/common';
import TehnikumService from './tehnikum.service';
import CreateTehnikumDto from './dto/create-tehnikum.dto';

@Controller('opt/tehnikums')
export default class TehnikumController {
  constructor(private tehnikumService: TehnikumService) {}

  @Get('')
  async getAll() {
    return this.tehnikumService.getAll();
  }

  @Post('')
  async create(@Body() body: CreateTehnikumDto) {
    return this.tehnikumService.create(body);
  }
}
