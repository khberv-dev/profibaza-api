import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import LegalService from './legal.service';
import { User } from '../../helpers/decorators/user.decorator';
import UpdateAddressDto from '../user/dto/update-address.dto';
import PostCommentDto from '../client/dto/post-comment.dto';

@Controller('legal')
export default class LegalController {
  constructor(private legalService: LegalService) {}

  @Get('me')
  async getMe(@User() user: User) {
    return this.legalService.getMe(user.roleUID);
  }

  @Put('update-address')
  async updateAddress(@User() user: User, @Body() body: UpdateAddressDto) {
    return this.legalService.updateAddress(user.roleUID, body);
  }

  @Post('comment/:id')
  async postComment(
    @User() user: User,
    @Param('id') orderId: string,
    @Body() body: PostCommentDto,
  ) {
    return this.legalService.postComment(user.roleUID, orderId, body);
  }
}
