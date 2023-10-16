/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, UseGuards, Req, Res, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { sign } from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  private generateAccessToken(user: any): string {
    const secretKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
    const expiresIn = '24h';
    const accessToken = sign({ user }, secretKey, { expiresIn });
    return accessToken;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res) {
    const accessToken = this.generateAccessToken(req.user);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      path: '/',
    });
    res.redirect('http://localhost:5173');
  }

  @Get('naver/callback')
  @UseGuards(AuthGuard('naver'))
  async naverLoginCallback(@Req() req, @Res() res) {
    const accessToken = this.generateAccessToken(req.user.user);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      path: '/',
    });
    res.redirect('http://localhost:5173');
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoCallback(@Req() req, @Res() res) {
    const accessToken = this.generateAccessToken(req.user.user);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      path: '/',
    });
    res.redirect('http://localhost:5173');
  }

  @Get('logout')
  async logout(@Res() res) {
    res.clearCookie('accessToken', { path: '/' });
    res.redirect('http://localhost:5173');
  }
}
