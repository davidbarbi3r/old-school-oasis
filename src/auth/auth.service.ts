import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IAuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: IAuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
          userName: dto.username,
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
    delete user.hash;
    return user;
  }
}
