/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/google.dto';
import { GoogleService } from './google.service';
import { GoogleAuthGuard } from 'src/auth/auth.guard';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Post()
  @Header('Access-Control-Allow-Origin', process.env.CLIENT_ADDRESS)
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return { message: 'User created Sucessfully', data: createUserDto };
  }

  @Get('to-google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLoginCallback(@Req() req, @Res() res) {
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
    @Res() res,
    @Req() req,
  ) {
    const isLogin = await this.googleService.googleLoginAPI(
      body.res.credential,
    );
    console.log(isLogin);
    res.cookie('Authentication', `Bearer ${isLogin}`);
    console.log(req.cookies);
    return { message: '토큰을 성공적으로 받았습니다.', data: req.cookies };
  }

  @Get('logout')
  logout(@Req() req, @Res() res) {
    req.logout();
    res.redirect('/');
  }
}
