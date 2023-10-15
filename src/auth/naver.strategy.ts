import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Values } from 'passport-naver';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_REDIRECT_URL,
    });
  }

  async validate(profile: Values, done: VerifyCallback): Promise<any> {
    const { _json, emails } = profile;
    const email = emails ? emails[0].value : null;
    const photo = _json.profile_image ? _json.profile_image : null;
    const user: User = await this.userService.findByEmailOrSave(email, photo);

    done(null, user);
  }
}
