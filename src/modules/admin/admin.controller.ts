import { Controller, Get, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
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

  @Get('invoices')
  async getInvoices(@Query('page', ParseIntPipe) page: number = 1, @Query('limit', ParseIntPipe) limit: number = 10) {
    return this.adminService.getInvoices(page, limit);
  }
}
