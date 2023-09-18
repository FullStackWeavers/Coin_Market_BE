// google.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google',
      scope: ['email', 'profile'],
    });
  }

  // refreshToken을 얻고 싶다면 해당 메서드 설정 필수
  authorizationParams(): { [key: string]: string } {
    return {
      access_type: 'offline',
      prompt: 'select_account',
    };
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    // 여기에서 유저를 데이터베이스에 저장하거나 가져오는 로직을 작성합니다.
    // 사용자 정보는 `profile` 변수에 포함됩니다.
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log(done);
    const { id, displayName, emails, photos } = profile;
    const email = emails[0].value;
    const name = displayName;
    const providerId = id;
    const photo = photos[0].value;

    const user: User = await this.userService.findByEmailOrSave(
      email,
      name,
      providerId,
      photo,
    );
    return user;
  }
}
