import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GoogleModule } from './google/google.module';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './socket/events.module';
import { BithumbModule } from './bithumb/bithumb.module';
import { Google } from './google/entity/google.entity';
import { AuthController } from './auth/auth.controller';
import { Kakao } from './kakao/entity/kakao.entity';
import { KakaoService } from './kakao/kakao.service';
import { KakaoModule } from './kakao/kakao.module';
import { KakaoController } from './kakao/kakao.controller';
import { KakaoRepository } from './kakao/kakao.repository';
import { GoogleService } from './google/google.service';
import { GoogleRepository } from './google/google.repository';
import { GoogleController } from './google/google.controller';
import { JwtService } from '@nestjs/jwt';
import { KakaoStrategy } from './auth/strategies/kakao.strategy';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'local' }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      entities: [Google, Kakao],
      synchronize: true,
    }),
    AuthModule,
    GoogleModule,
    EventsModule,
    BithumbModule,
    KakaoModule,
  ],
  controllers: [
    AuthController,
    AppController,
    KakaoController,
    GoogleController,
  ],
  providers: [
    AppService,
    KakaoService,
    KakaoRepository,
    GoogleService,
    GoogleRepository,
    JwtService,
    KakaoStrategy,
    AuthService,
  ],
})
export class AppModule {}
