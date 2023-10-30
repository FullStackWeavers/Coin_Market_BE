import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://web-coin-market-fe-euegqv2llockze72.sel5.cloudtype.app',
    credentials: true,
  });

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
