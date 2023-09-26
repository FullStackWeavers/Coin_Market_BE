import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleModule } from 'src/google/google.module';
import { SessionSerializer } from './session.serializer';
import { ConfigService } from '@nestjs/config';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { KakaoModule } from 'src/kakao/kakao.module';
import { GoogleService } from 'src/google/google.service';
import { KakaoService } from 'src/kakao/kakao.service';
import { GoogleRepository } from 'src/google/google.repository';
import { KakaoRepository } from 'src/kakao/kakao.repository';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GoogleModule,
    KakaoModule,
    GoogleRepository,
    KakaoRepository,
    TypeOrmModule.forFeature([KakaoRepository, GoogleRepository]),
  ],
  providers: [
    AuthService,
    SessionSerializer,
    GoogleStrategy,
    KakaoStrategy,
    ConfigService,
    GoogleService,
    KakaoService,
    GoogleRepository,
    KakaoRepository,
    JwtService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
