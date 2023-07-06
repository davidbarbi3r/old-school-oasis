import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})], // 👈 we customize it in the auth.service because we'll use a refresh token with a different configuration
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
