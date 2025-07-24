<<<<<<< HEAD
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
=======
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
>>>>>>> ed7c87eef88ec0ab57fcce1ae5f83a036a0c1aa3

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
<<<<<<< HEAD
  await app.listen(process.env.PORT ?? 3000);
=======
  await app.listen(process.env.PORT ?? 3001);
>>>>>>> ed7c87eef88ec0ab57fcce1ae5f83a036a0c1aa3
}
bootstrap();
