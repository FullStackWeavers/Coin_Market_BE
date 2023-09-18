// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { UserModule } from 'src/user/user.module';
// import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'google', session: true }),
  ],
  providers: [AuthService, SessionSerializer, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
