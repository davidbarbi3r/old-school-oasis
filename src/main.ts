import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 3003;

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const config = new DocumentBuilder()
    .setTitle('Old School Oasis API')
    .setDescription('The Old School Oasis API description')
    .setVersion('0.1')
    .addTag('Old School Oasis')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  // global pipes are used to modify the incoming data before it reaches the controller
  // validation pipe is a special one used to validate the incoming data
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove unknown properties from DTOs
    }),
  );
  await app.listen(port, 'localhost');
  Logger.log(`Server running on ${await app.getUrl()})`, 'Bootstrap');
}
bootstrap();
