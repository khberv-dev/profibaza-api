import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import AuthService from './auth.service';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import VerifyOtpDto from './dto/verify-otp.dto';

@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('send-otp')
  sendOTP(@Query('phone') phone: string) {
    return this.authService.sendOtp(phone);
  }

  @Post('verify-otp')
  verifyOTP(@Body() body: VerifyOtpDto) {
    return this.authService.verifyOtp(body);
  }
}
