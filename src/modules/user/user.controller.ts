import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import JwtAuthGuard from '../../helpers/guards/jwt-auth.guard';
import UpdatePasswordDto from './dto/update-password.dto';
import { User } from '../../helpers/decorators/user.decorator';
import UpdateUserDto from '../auth/dto/update-user.dto';
import RequestResetPasswordDto from './dto/request-reset-password.dto';
import ResetPasswordDto from './dto/reset-password.dto';
import { Public } from 'src/helpers/decorators/public.decorator';
import { avatarInterceptor } from './interceptor/avatar.interceptor';
import type { Response } from 'express';
import UserService from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export default class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async getMe(@User() user: User) {
    return this.userService.getMe(user.id);
  }

  @Put('update-password')
  async updatePassword(@User() user: User, @Body() body: UpdatePasswordDto) {
    return this.userService.updatePassword(user.id, body);
  }

  @Public()
  @Post('request-reset-password')
  async requestResetPassword(@Body() body: RequestResetPasswordDto) {
    return this.userService.requestResetPassword(body);
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.userService.resetPassword(body);
  }

  @Put('update')
  async update(@User() user: User, @Body() body: UpdateUserDto) {
    return this.userService.update(user.id, body);
  }

  @Post('update-avatar')
  @UseInterceptors(avatarInterceptor)
  async uploadAvatar(@User() user: User, @UploadedFile() file: Express.Multer.File) {
    return this.userService.updateAvatar(user.id, file.filename);
  }

  @Get('avatar')
  async getAvatar(@User() user: User, @Res() res: Response) {
    const path = await this.userService.getAvatar(user.id);

    if (path) {
      res.sendFile(path);
    } else {
      throw new NotFoundException();
    }
  }

  @Post('request-activation')
  async requestActivation(@User() user: User) {
    return this.userService.requestActivation(user.id);
  }

  @Post('process-activation')
  async processActivation(@User() user: User) {
    return this.userService.processActivation(user.id);
  }
}
