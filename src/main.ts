import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //confguração swagger
  const config = new DocumentBuilder()
  .setTitle('lojinha')
  .setDescription('lojinha API')
  .setVersion('1.0')
  .addTag('lojinha')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  useContainer(app.select(AppModule),{ fallbackOnErrors: true })
  await app.listen(3000);
}
bootstrap();
