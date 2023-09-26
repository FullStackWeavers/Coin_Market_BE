/* eslint-disable prettier/prettier */
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
  async kakaoLogin() {}

  @Get('callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoLoginCallback(
    @Req() req: Request & { user: any },
    @Res() res: Response,
  ) {
    const { accessToken, profile } = req.user;
    const { displayName, emails, photos } = profile;
    const user = await this.kakaoService.saveKakaoUser(
      displayName,
      emails[0].value,
      photos[0].value,
    );
    res.redirect('/');
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }
}
