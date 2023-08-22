import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import swaggerSetup from './swaggerSetup';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Creating app and retrieving config
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  // Setting up swagger
  const isSwaggerOnly = config.get<boolean>('SWAGGER_ONLY', false);
  await swaggerSetup(app, isSwaggerOnly);

  // If .env variable "SWAGGER_ONLY" is true app stops, otherwise it starts
  if (!isSwaggerOnly) {
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

    const PORT = config.get<number>('PORT');
    await app.listen(PORT);
  }
}

bootstrap();
