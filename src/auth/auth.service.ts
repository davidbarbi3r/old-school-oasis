import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prismaModule/prisma.service';
import { IAuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  // 👇 we create a method to sign up the user (hash password, save user in db, return user without hash)
  async signup(dto: IAuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
          userName: dto.username,
          role: dto.role,
          authProvider: 'local',
        },
      });
      delete user.hash;

      return user;
    } catch (error) {
      // grab this error to handle unique constraint on dto
      if (error.code === 'P2002') {
        // error code for duplicate key when unique constraint is violated
        throw new ForbiddenException('Email already exists');
      }
      throw error;
    }
  }

  // 👇 we create a method to sign in the user (find user in db, verify password, return token)
  async signin(dto: Omit<IAuthDto, 'username'>) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
    const isPasswordValid = await argon.verify(user.hash, dto.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid credentials');
    }

    return this.signToken(user.id, user.email);
  }

  // 👇 we create a method to sign the token
  async signToken(userId: string, email: string): Promise<{ token: string }> {
    const payload = { sub: userId, email }; // 👈 we call sub the id of the user because it's the standard name for the id of the user in a JWT
    const token = await this.jwt.signAsync(payload, {
      secret: this.config.get<string>('JWT_SECRET'),
      expiresIn: '30d', // 👈 we set the expiration to 30 days
    });

    return {
      token: token,
    };
  }
}
