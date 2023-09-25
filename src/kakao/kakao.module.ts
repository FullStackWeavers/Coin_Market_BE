/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KakaoUser } from './entity/kakao.entity';
import { KakaoService } from './kakao.service';
import { KakaoController } from './kakao.controller';
import { KakaoRepository } from './kakao.repository';

@Module({
  imports: [TypeOrmModule.forFeature([KakaoUser])],
  controllers: [KakaoController],
  providers: [KakaoService, KakaoRepository],
  exports: [KakaoService],
})
export class KakaoModule {}
