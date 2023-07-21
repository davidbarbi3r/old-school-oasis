import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prismaModule/prisma.service';
import { CreatePlatformDto, UpdatePlatformDto } from './dto';

@Injectable()
export class PlatformService {
  constructor(private prisma: PrismaService) {}

  async getPlatformById(id: string) {
    const platform = await this.prisma.platform.findUnique({
      where: {
        id: id,
      },
      include: {
        games: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!platform) throw new NotFoundException('No platform found with this id');

    return platform;
  }

  async getAllPlatform(skip?: number, take?: number) {
    const platforms = await this.prisma.platform.findMany({
      skip: skip || 0,
      take: take,
    });

    if (platforms.length === 0) throw new NotFoundException('No platforms found');

    return platforms;
  }

  async createPlatform(dto: CreatePlatformDto) {
    const platform = await this.prisma.platform.create({
      data: {
        ...dto,
        releaseDate: new Date(dto.releaseDate),
      },
    });

    return platform;
  }

  async updatePlatform(id: string, dto: UpdatePlatformDto) {
    const updatedPlatform = await this.prisma.platform.update({
      where: {
        id: id,
      },
      data: dto,
    });

    if (!updatedPlatform) throw new NotFoundException('No platform found with this id');

    return updatedPlatform;
  }

  async deletePlatform(id: string) {
    const platform = await this.prisma.platform.delete({
      where: {
        id: id,
      },
    });

    if (!platform) throw new NotFoundException('No platform found with this id');

    return platform;
  }
}
