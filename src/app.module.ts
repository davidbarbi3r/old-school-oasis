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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 👈 no decorator to set it global because it's an imported module
    }),
    AuthModule,
    PrismaModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, PrismaService, JwtService],
  exports: [],
})
export class AppModule {
  constructor() {}
}
