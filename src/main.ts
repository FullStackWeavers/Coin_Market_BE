import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(
    3000,
    'https://port-0-coin-market-be-12fhqa2llob5p0if.sel5.cloudtype.app',
  );
}

bootstrap();
