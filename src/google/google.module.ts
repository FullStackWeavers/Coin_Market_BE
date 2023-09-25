import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GoogleRepository } from './google.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([GoogleRepository]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('ACCESS_TOKEN_PRIVATE_KEY'),
        signOptions: { expiresIn: '24h' },
      }),
    }),
    GoogleRepository,
  ],
  controllers: [GoogleController],
  providers: [GoogleService, GoogleRepository],
})
export class GoogleModule {}
