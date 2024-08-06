import * as path from 'path';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '100mb' })); // Atur limit sesuai kebutuhan
  app.use(
    bodyParser.urlencoded({
      limit: '100mb',
      extended: true,
      parameterLimit: 100000,
    }),
  );
  app.use(bodyParser.text({ limit: '200mb' }));
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useStaticAssets(path.join(__dirname, '../public/img'));

  const config = new DocumentBuilder()
    .setTitle('Ecommerce Nest JS React JS')
    .setDescription('This is api documentation authored by anju lubis')
    .setVersion('v1')
    // .addTag('ecommerce apps')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
