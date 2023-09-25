/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KakaoRepository } from './kakao.repository';
import { Profile } from 'passport';
import { KakaoUser } from './entity/kakao.entity';

@Injectable()
export class KakaoService {
  constructor(
    @InjectRepository(KakaoRepository)
    private readonly kakaoRepository: KakaoRepository,
  ) {}

  async saveKakaoUser(
    profileNickname: string,
    accountEmail: string,
    profileImage: string,
  ): Promise<KakaoUser> {
    const kakaoUser = new KakaoUser();
    kakaoUser.profileNickname = profileNickname;
    kakaoUser.accountEmail = accountEmail;
    kakaoUser.profile_image = profileImage;
    return this.kakaoRepository.save(kakaoUser);
  }
}
