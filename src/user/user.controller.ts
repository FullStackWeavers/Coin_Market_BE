import { Body, Controller, Header, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  @Post()
  @Header('Access-Control-Allow-Origin', 'http://localhost:5173')
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);

    return { message: 'User created Sucessfully', data: createUserDto };
  }
}
