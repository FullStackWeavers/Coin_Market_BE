/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { KakaoService } from './kakao.service';
import { Request, Response } from 'express';
import { KakaoAuthGuard } from 'src/auth/auth.guard';

@Controller('kakao')
export class KakaoController {
  constructor(private readonly kakaoService: KakaoService) {}

  @Get('login')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin() {
    // Kakao 로그인은 AuthGuard에서 처리하므로 별도의 코드 필요 없음
  }

  @Get('callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoLoginCallback(@Req() req: Request, @Res() res: Response) {
    const { accessToken, profile } = req.user as any; // passport-kakao의 사용에 따라 타입 지정
    const { displayName, emails, photos } = profile;
    const user = await this.kakaoService.saveKakaoUser(
      displayName,
      emails[0].value,
      photos[0].value,
    );
    res.redirect('/'); // 로그인 후 리다이렉션
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout(); // 로그아웃
    res.redirect('/'); // 로그아웃 후 리다이렉션
  }
}
