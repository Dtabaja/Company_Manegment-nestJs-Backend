import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  //4200 - angular cors, credentials:true = passing cookies in every request
  app.enableCors({origin: 'http://localhost:4200',credentials:true})
  await app.listen(8000);
}
bootstrap();
