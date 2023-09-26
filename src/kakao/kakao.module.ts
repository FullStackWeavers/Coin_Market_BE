/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kakao } from './entity/kakao.entity';
import { KakaoService } from './kakao.service';
import { KakaoController } from './kakao.controller';
import { KakaoRepository } from './kakao.repository';
import { AuthService } from 'src/auth/auth.service';
import { KakaoStrategy } from 'src/auth/strategies/kakao.strategy';
import { GoogleRepository } from 'src/google/google.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Kakao])],
  controllers: [KakaoController],
  providers: [
    KakaoService,
    KakaoRepository,
    GoogleRepository,
    AuthService,
    KakaoStrategy,
  ],
  exports: [KakaoService, TypeOrmModule, KakaoRepository],
})
export class KakaoModule {}
