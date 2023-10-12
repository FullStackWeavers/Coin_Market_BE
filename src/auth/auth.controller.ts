/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  UseGuards,
  Req,
  Request,
  Res,
  Post,
  Body,
  Header,
  Response,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';
import { Response as ExpressResponse } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Get('to-google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallback(@Res() res, @Req() req) {
    res.cookie('user', JSON.stringify(req.user), { httpOnly: true });
    res.redirect('http://localhost:5173');
  }

  @Post('google/cors')
  @Header('Cross-Origin-Opener-Policy', '*')
  async getFrontendData(
    @Body()
    body: {
      res: { credential: string; clientId: string };
    },
    @Response() response,
    @Request() req,
  ) {
    const isLogin = await this.userService.googleLoginAPI(body.res.credential);
    response.cookie('Authentication', `Bearer ${isLogin}`);
    return { message: '토큰을 성공적으로 받았습니다.', data: req.cookies };
  }

  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  async naverLogin(@Req() req, @Res() res) {
    return res;
  }

  @Get('naver/callback')
  @UseGuards(AuthGuard('naver'))
  async naverLoginCallback(@Res() res: ExpressResponse, @Req() req) {
    res.cookie('user', JSON.stringify(req.user), { httpOnly: true });
    res.redirect('http://localhost:5173');
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(@Request() req) {}

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoCallback(@Res() res, @Req() req) {
    res.cookie('user', JSON.stringify(req.user), { httpOnly: true });
    res.redirect('http://localhost:5173');
  }

  @Post('logout')
  async logout(@Req() req, @Res() res) {
    req.logout();
    res.redirect('http://localhost:3000');
  }
}
