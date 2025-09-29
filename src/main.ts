import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as config from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('App');
  const app = await NestFactory.create(AppModule);
  const PORT = config.PORT ?? 8080;
  const validatorPipe = new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    disableErrorMessages: false,
  });
  const swaggerConfig = new DocumentBuilder().setTitle('Profibaza').build();
  const swaggerDocumentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, swaggerDocumentFactory);
  app.enableCors({});
  app.useGlobalPipes(validatorPipe);
  app.setGlobalPrefix('api');
  logger.log(`Listening on :${PORT}`);
  await app.listen(PORT);
}

bootstrap();
