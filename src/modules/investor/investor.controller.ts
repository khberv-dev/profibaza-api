import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../../helpers/guards/jwt-auth.guard';
import InvestorService from './investor.service';
import { User } from '../../helpers/decorators/user.decorator';
import CreateContactDto from '../legal/dto/create-contact.dto';
import CreateVacancyDto from '../legal/dto/create-vacancy.dto';
import CreateProjectDto from './dto/create-project.dto';
import UpdateAddressDto from '../user/dto/update-address.dto';

@Controller('investor')
@UseGuards(JwtAuthGuard)
export default class InvestorController {
  constructor(private investorService: InvestorService) {}

  @Get('me')
  async getMe(@User() user: User) {
    return this.investorService.getMe(user.roleUID);
  }

  @Put('update-address')
  async updateAddress(@User() user: User, @Body() body: UpdateAddressDto) {
    return this.investorService.updateAddress(user.roleUID, body);
  }

  @Post('contacts')
  async addContact(@User() user: User, @Body() body: CreateContactDto) {
    return this.investorService.createContact(user.roleUID, body);
  }

  @Get('vacancies')
  async getVacancies(@User() user: User) {
    return this.investorService.getVacancies(user.roleUID);
  }

  @Get('vacancies/:id')
  async getVacancyById(@Param('id') id: string) {
    return this.investorService.getVacancyById(id);
  }

  @Post('create-vacancy')
  async createVacancy(@User() user: User, @Body() body: CreateVacancyDto) {
    return this.investorService.createVacancy(user.roleUID, body);
  }

  @Post('projects')
  async createProject(@User() user: User, @Body() body: CreateProjectDto) {
    return this.investorService.createProject(user.roleUID, body);
  }

  @Get('projects')
  async getProject(@User() user: User) {
    return this.investorService.getProjects(user.roleUID);
  }
}
