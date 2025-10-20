import { Controller, Get, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../../helpers/guards/jwt-auth.guard';
import AdminService from './admin.service';

@UseGuards(JwtAuthGuard)
@Controller('admin')
export default class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('overall')
  async getOverallStats() {
    return this.adminService.getOverallStats();
  }
}
