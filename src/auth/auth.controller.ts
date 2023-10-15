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
  async googleLoginCallback(@Res() res, @Req() req) {
    const accessToken = this.generateAccessToken(req.user.user);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.redirect('http://localhost:5173');
  }

  @Get('naver/callback')
  @UseGuards(AuthGuard('naver'))
  async naverLoginCallback(@Req() req, @Res() res) {
    const accessToken = this.generateAccessToken(req.user.user);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.redirect('http://localhost:5173');
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoCallback(@Req() req, @Res() res) {
    const accessToken = this.generateAccessToken(req.user.user);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.redirect('http://localhost:5173');
  }

  @Post('logout')
  async logout(@Req() req, @Res() res) {
    req.logout();
    res.redirect('http://localhost:3000');
  }
}
