import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from 'src/prismaModule/prisma.service';
import { Strategy } from 'passport-steam';

export class SteamStrategy extends PassportStrategy(Strategy, 'steam') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      returnURL: 'http://localhost:3000/auth/steam/return',
      realm: 'http://localhost:3000/',
      apiKey: config.get<string>('STEAM_API_KEY'),
    });
  }

  validate(identifier: string, profile: any) {
    return { identifier, profile };
  }
}
