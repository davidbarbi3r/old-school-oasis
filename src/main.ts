import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.enableCors();
  // global pipes are used to modify the incoming data before it reaches the controller
  // validation pipe is a special one used to validate the incoming data
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove unknown properties from DTOs
    }),
  );
  await app.listen(port);
  Logger.log(`Server running on ${await app.getUrl()})`, 'Bootstrap');
}
bootstrap();
