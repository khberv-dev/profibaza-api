import { Module } from '@nestjs/common';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import * as config from '../../config';
import UserModule from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import JwtStrategy from '../../helpers/jwt/jwt.strategy';
import ClientModule from '../client/client.module';
import LegalModule from '../legal/legal.module';
import WorkerModule from '../worker/worker.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.JWT_KEY,
      signOptions: { expiresIn: '7d' },
    }),
    UserModule,
    ClientModule,
    LegalModule,
    WorkerModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
})
export default class AuthModule {}
