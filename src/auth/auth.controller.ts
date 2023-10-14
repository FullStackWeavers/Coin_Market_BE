/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, UseGuards, Req, Res, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Res() res, @Req() req) {
    const accessToken = req.user.accessToken;
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.redirect('http://localhost:5173');
  }

  @Get('naver/callback')
  @UseGuards(AuthGuard('naver'))
  async naverLoginCallback(@Req() req, @Res() res) {
    const accessToken = req.user.accessToken;
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.redirect('http://localhost:5173');
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoCallback(@Req() req, @Res() res) {
    const accessToken = req.user.accessToken;
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.redirect('http://localhost:5173');
  }

  @Post('logout')
  async logout(@Req() req, @Res() res) {
    req.logout();
    res.redirect('http://localhost:3000');
  }
}
