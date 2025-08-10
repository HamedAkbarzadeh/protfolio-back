import { NestFactory } from '@nestjs/core';
import { AppModule } from './@core/module/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser())
  app.enableCors({
    origin: 'http://localhost:5173',
    credential: true
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
