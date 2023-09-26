/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Kakao } from 'src/kakao/entity/kakao.entity';
import { Google } from 'src/google/entity/google.entity';
import { KakaoRepository } from 'src/kakao/kakao.repository';
import { GoogleRepository } from 'src/google/google.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly kakaoRepository: KakaoRepository,
    private readonly googleRepository: GoogleRepository,
  ) {}

  async validateGoogleUser(email: string): Promise<Google> {
    const user = await this.googleRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }
    return user;
  }

  async validateKakaoUser(accountEmail: any): Promise<Kakao> {
    const user = await this.kakaoRepository.findOne({
      where: { accountEmail },
    });
    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }
    return user;
  }
}
