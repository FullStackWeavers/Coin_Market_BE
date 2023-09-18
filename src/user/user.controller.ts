import { Body, Controller, Header, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  @Post()
  @Header('Access-Control-Allow-Origin', process.env.CLIENT_ADDRESS)
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return { message: 'User created Sucessfully', data: createUserDto };
  }
}
