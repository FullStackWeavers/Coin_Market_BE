import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { BithumbModule } from './bithumb/bithumb.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      entities: [],
      socketPath: '/tmp/mysql.sock',
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
    EventsModule,
    BithumbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
