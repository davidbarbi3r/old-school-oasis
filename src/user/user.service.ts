import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prismaModule/prisma.service';
import { ChangeRoleDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    delete user.hash;
    return user;
  }

  async getAllUsers(skip?: number, take?: number) {
    // 👇 we offset pagination, which is simpler than cursor pagination but less efficient
    // offset pagination is not recommended for large datasets as it iterates over all records until it reaches the offset
    // cursor pagination is more efficient as it uses a cursor (id) to paginate
    const users = await this.prisma.user.findMany({
      skip: skip || 0,
      take: take || 10,
    });

    return users;
  }

  async updateProfile(id: string, dto: UpdateUserDto) {
    const user = await this.getUserById(id);
    try {
      return await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          ...user,
          ...dto,
        },
      });
    } catch (err) {
      throw new BadRequestException(`Something went wrong! ${err.message}`);
    }
  }

  async deleteUser(id: string) {
    const deletedUser = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
    if (!deletedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    delete deletedUser.hash;

    return deletedUser;
  }

  async changeUserRole(id: string, dto: ChangeRoleDto) {
    const user = await this.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (user.role === dto.role) {
      throw new BadRequestException('User already has this role');
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        role: dto.role,
      },
    });
    delete updatedUser.hash;

    return updatedUser;
  }
}
