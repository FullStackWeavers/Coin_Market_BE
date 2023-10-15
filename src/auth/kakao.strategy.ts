import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-kakao';
import { UserService } from 'src/user/user.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
    });
  }

  async validate(profile: any, done: VerifyCallback) {
    const { _json } = profile;
    const email = _json.kakao_account.email;
    const photo = _json.properties.profile_image;

    const user = await this.userService.findByEmailOrSave(email, photo);

    done(null, user);
  }
}
