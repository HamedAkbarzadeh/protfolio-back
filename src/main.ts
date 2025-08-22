import { NestFactory } from '@nestjs/core';
import { AppModule } from './@core/module/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as express from 'express'
import { join } from 'path';

async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser())
    app.enableCors({
        origin: 'http://localhost:5173',
        credential: true
    })
    app.use('/upload', express.static(join(process.cwd(), 'public/uploads')))
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
