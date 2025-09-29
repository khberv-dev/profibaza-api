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

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'files'),
      serveRoot: '/public',
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    SuggestionModule,
    ClientModule,
    LegalModule,
    WorkerModule,
    DocumentModule,
  ],
})
export class AppModule {}
