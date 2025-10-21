import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import WorkerService from './worker.service';
import CreateWorkerProfessionDto from './dto/create-worker-profession.dto';
import JwtAuthGuard from '../../helpers/guards/jwt-auth.guard';
import { User } from '../../helpers/decorators/user.decorator';
import { documentInterceptor } from './interceptor/document.interceptor';
import type { Response } from 'express';
import { professionDemoInterceptor } from './interceptor/profession-demo.interceptor';
import UpdateWorkerProfessionDto from './dto/update-worker-profession.dto';
import CommentFeedbackDto from './dto/comment-feedback.dto';
import GetOrdersDto from './dto/get-orders.dto';
import CreateExperienceDto from './dto/create-experience.dto';
import UpdateExperienceDto from './dto/update-experience.dto';
import CreateOfferDto from './dto/create-offer.dto';
import { orderMaterialInterceptor } from './interceptor/order-material.interceptor';

@UseGuards(JwtAuthGuard)
@Controller('worker')
export default class WorkerController {
  constructor(private workerService: WorkerService) {}

  @Get('profession')
  async getWorkerProfession(@User() user: User) {
    return this.workerService.getWorkerProfessions(user.roleUID);
  }

  @Post('profession')
  async createWorkerProfession(@User() user: User, @Body() body: CreateWorkerProfessionDto) {
    return this.workerService.createWorkerProfession(user.roleUID, body);
  }

  @Put('profession/:id')
  async updateWorkerProfession(
    @Param('id') workerProfessionId: string,
    @Body() body: UpdateWorkerProfessionDto,
  ) {
    return this.workerService.updateProfession(workerProfessionId, body);
  }

  @Post('profession/upload-demo/:id')
  @UseInterceptors(professionDemoInterceptor)
  async uploadProfessionDemo(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') workerProfessionId: string,
  ) {
    return this.workerService.createDemo(workerProfessionId, file.filename);
  }

  @Get('profession/demos/:id')
  async getProfessionDemos(@Param('id') workerProfessionId: string) {
    return this.workerService.getDemos(workerProfessionId);
  }

  @Post('profession/:id/experience')
  async createExperience(
    @Param('id') workerProfessionId: string,
    @Body() body: CreateExperienceDto,
  ) {
    return this.workerService.createExperience(workerProfessionId, body);
  }

  @Put('profession/experience/:id')
  async updateExperience(@Param('id') experienceId: string, @Body() body: UpdateExperienceDto) {
    return this.workerService.updateExperience(experienceId, body);
  }

  @Post('upload-document')
  @UseInterceptors(documentInterceptor)
  async uploadDocument(@User() user: User, @UploadedFile() file: Express.Multer.File) {
    return this.workerService.createDocument(user.roleUID, file.filename);
  }

  @Get('documents')
  async getDocuments(@User() user: User) {
    return this.workerService.getDocuments(user.roleUID);
  }

  @Get('documents/:id')
  async getDocument(@Param('id') fileId: string, @Res() res: Response) {
    const path = await this.workerService.getDocument(fileId);

    res.sendFile(path);
  }

  @Get('demos/:id')
  async getDemo(@Param('id') fileId: string, @Res() res: Response) {
    const path = await this.workerService.getDemo(fileId);

    res.sendFile(path);
  }

  @Get('new-orders')
  async getNewOrders(@User() user: User) {
    return this.workerService.getNewOrders(user.roleUID);
  }

  @Get('orders')
  async getOrders(@User() user: User, @Query() query: GetOrdersDto) {
    return this.workerService.getOrders(user.roleUID, query);
  }

  @Post('accept-order/:id')
  async acceptOrder(@Param('id') orderId: string) {
    return this.workerService.acceptOrder(orderId);
  }

  @Post('reject-order/:id')
  async rejectOrder(@Param('id') orderId: string) {
    return this.workerService.rejectOrder(orderId);
  }

  @Post('feedback/:id')
  async postCommentFeedback(@Param('id') commentId: string, @Body() body: CommentFeedbackDto) {
    return this.workerService.postCommentFeedback(commentId, body);
  }

  @Post('finish-order/:id')
  async finishOrder(@Param('id') orderId: string) {
    return this.workerService.finishOrder(orderId);
  }

  @Post('upload-order-material/:id')
  @UseInterceptors(orderMaterialInterceptor)
  async uploadOrderMaterial(
    @Param('id') orderId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.workerService.uploadOrderMaterial(orderId, file.filename);
  }

  @Post('create-offer')
  async createOffer(@Body() body: CreateOfferDto) {
    return this.workerService.createOffer(body);
  }

  @Get('offers')
  async getOffers(@User() user: User) {
    return this.workerService.getOffers(user.roleUID);
  }

  @Get('search-vacancies')
  async searchVacancies(
    @Query('search') search: string,
    @Query('minSalary') minSalary: number = 0,
    @Query('maxSalary') maxSalary: number = 0,
  ) {
    return this.workerService.searchVacancies(search, minSalary, maxSalary);
  }

  @Get('download-resume/:id')
  async downloadResume(@Param('id') workerProfessionId: string, @Res() res: Response) {
    const fileName = await this.workerService.downloadResume(workerProfessionId);

    res.sendFile(fileName);
  }
}
