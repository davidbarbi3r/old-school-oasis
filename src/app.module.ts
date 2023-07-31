import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prismaModule/prisma.module';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prismaModule/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { PlatformModule } from './platform/platform.module';
import { CollectionModule } from './collection/collection.module';
import { GameService } from './game/game.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 👈 no decorator to set it global because it's an imported module
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    GameModule,
    PlatformModule,
    CollectionModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, PrismaService, JwtService, GameService],
  exports: [],
})
export class AppModule {
  constructor() {}
}
