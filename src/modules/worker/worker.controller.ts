import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
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
    @User() user: User,
    @Body() body: UpdateWorkerProfessionDto,
  ) {
    return this.workerService.updateProfession(workerProfessionId, body);
  }

  @Post('profession/upload-demo/:id')
  @UseInterceptors(professionDemoInterceptor)
  async uploadProfessionDemo(
    @User() user: User,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') workerProfessionId: string,
  ) {
    return this.workerService.createDemo(workerProfessionId, file.filename);
  }

  @Get('profession/demos/:id')
  async getProfessionDemos(@User() user: User, @Param('id') workerProfessionId: string) {
    return this.workerService.getDemos(workerProfessionId);
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

  @Post('accept-order/:id')
  async acceptOrder(@Param('id') orderId: string) {
    return this.workerService.acceptOrder(orderId);
  }

  @Post('reject-order/:id')
  async rejectOrder(@Param('id') orderId: string) {
    return this.workerService.acceptOrder(orderId);
  }

  @Post('feedback/:id')
  async postCommentFeedback(@Param('id') commentId: string, @Body() body: CommentFeedbackDto) {
    return this.workerService.postCommentFeedback(commentId, body);
  }
}
