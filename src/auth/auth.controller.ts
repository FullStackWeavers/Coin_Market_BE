/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

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
      httpOnly: false,
      secure: true,
      path: '/',
    });
    res.redirect(
      'https://web-coin-market-fe-euegqv2llodpzutn.sel5.cloudtype.app',
    );
  }

  @Get('naver/callback')
  @UseGuards(AuthGuard('naver'))
  async naverLoginCallback(@Req() req, @Res() res) {
    const accessToken = this.generateAccessToken(req.user.user);
    res.cookie('accessToken', accessToken, {
      httpOnly: false,
      secure: true,
      path: '/',
    });
    res.redirect(
      'https://web-coin-market-fe-euegqv2llodpzutn.sel5.cloudtype.app',
    );
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoCallback(@Req() req, @Res() res) {
    const accessToken = this.generateAccessToken(req.user.user);
    res.cookie('accessToken', accessToken, {
      path: '/',
    });
    res.redirect(
      'https://web-coin-market-fe-euegqv2llodpzutn.sel5.cloudtype.app',
    );
  }

  @Get('logout')
  async logout(@Res() res) {
    res.clearCookie('accessToken', { path: '/' });
    res.redirect(
      'https://web-coin-market-fe-euegqv2llodpzutn.sel5.cloudtype.app',
    );
  }
}
