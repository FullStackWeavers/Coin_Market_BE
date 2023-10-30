import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
// import { server } from './main'; // Your NestJS app

const expressApp = require('express')();

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(
    new ExpressAdapter(expressApp)
  );

  await app.init();
}

bootstrap();

module.exports = expressApp;
