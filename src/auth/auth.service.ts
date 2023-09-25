/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { GoogleService } from 'src/google/google.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: GoogleService) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUser(username);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user) {
      return {
        userId: user.id,
      };
    }
    return null;
  }
}
