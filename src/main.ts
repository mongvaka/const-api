import { HttpException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const environment = configService.get('NODE_ENV', 'development');
  const port = configService.get('PORT', '3033');
  const version = 'v1';
  const globalPrefix = `/api/${version}`;
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  if (environment === 'development') {
    const options = new DocumentBuilder()
      .setTitle('Shop constanst API')
      .setDescription('Shop constanst')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${globalPrefix}/docs`, app, document);
  }
  app.enableCors();

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`with ${environment} environment`);
  console.log(`docs ${await app.getUrl()}${globalPrefix}/docs`);
}
bootstrap();

