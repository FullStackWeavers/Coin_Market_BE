// auth.controller.ts
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

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Get('to-google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLoginCallback(@Req() req, @Res() res) {
    // 로그인 후 리디렉션 또는 사용자 정의 로직을 수행할 수 있습니다.
    const { user } = req;
    return res.send(user);
  }

  @Post('google2')
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
    console.log(isLogin);
    response.cookie('Authentication', `Bearer ${isLogin}`);
    console.log(req.cookies);
    return { message: '토큰을 성공적으로 받았습니다.', data: req.cookies };
  }

  @Post('logout')
  async logout(@Req() req, @Res() res) {
    req.logout(); // 세션을 종료합니다.
    res.redirect('http://localhost:3000'); // 로그아웃 후 리다이렉트할 URL을 지정합니다.
  }
}
