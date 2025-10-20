import { Module } from '@nestjs/common';
import DatabaseModule from './database/database.module';
import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';
import SuggestionModule from './suggestion/suggestion.module';
import ClientModule from './client/client.module';
import LegalModule from './legal/legal.module';
import WorkerModule from './worker/worker.module';
import DocumentModule from './document/document.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'node:path';
import { ScheduleModule } from '@nestjs/schedule';
import CronModule from './cron/cron.module';
import PaymentModule from './payment/payment.module';
import AdminModule from './admin/admin.module';

@Module({
  imports: [
    DatabaseModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'files'),
      serveRoot: '/public',
    }),
    ScheduleModule.forRoot(),
    CronModule,
    AuthModule,
    UserModule,
    SuggestionModule,
    ClientModule,
    LegalModule,
    WorkerModule,
    DocumentModule,
    PaymentModule,
    AdminModule,
  ],
})
export class AppModule {}
