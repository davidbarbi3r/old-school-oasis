import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prismaModule/prisma.service';
import { AddGameToCollectionDto, AddPlatformToCollectionDto, CreateCollectionDto } from './dto/collection.dto';
import { CompletedItem, ItemCondition, WorkingState } from '@prisma/client';

@Injectable()
export class CollectionService {
  constructor(private prisma: PrismaService) {
  }

  async createCollection(userId: string, dto: CreateCollectionDto) {
    const collection = await this.prisma.collection.create({
      data: {
        ...dto,
        userId,
      },
    });

    return collection;
  }

  async getAllCollections() {
    const collections = await this.prisma.collection.findMany();
    if (collections.length === 0) {
      throw new NotFoundException('No collections found');
    }

    return collections;
  }

  async getMyCollections(userId: string) {
    const collections = await this.prisma.collection.findMany({
      where: {
        userId,
      },
      include: {
        gamesItems: {
          include: {
            game: true,
            state: true,
            platform: true,
          },
        },
        PlatformsItems: {
          include: {
            platform: true,
            version: true,
            state: true,
          },
        },
      },
    });
    if (collections.length === 0) {
      throw new NotFoundException('No collections found');
    }

    return collections;
  }

  async getCollectionById(id: string) {
    const collection = await this.prisma.collection.findUnique({
      where: {
        id,
      },
    });
    if (!collection) {
      throw new NotFoundException('No collection found');
    }

    return collection;
  }

  async addGameToCollection(userId: string, dto: AddGameToCollectionDto) {
    const collections = await this.prisma.collection.findMany({
      where: {
        userId: userId,
      },
    });

    const gameStateDefault = {
      working: WorkingState.working,
      completed: CompletedItem.itemOnly,
      condition: ItemCondition.good,
      name: '',
      description: '',
    };

    const game = await this.prisma.gameItem.create({
      data: {
        state: {
          create: gameStateDefault,
        },
        game: {
          connect: {
            id: dto.gameId,
          },
        },
        collection: {
          connect: {
            id: collections[0].id,
          },
        },
        platform: {
          connect: {
            id: dto.platformId,
          },
        },
        gamesOnPlatforms: {
          connect: {
            gameId_platformId: {
              gameId: dto.gameId,
              platformId: dto.platformId,
            },
          },
        },
      },
    });

    return game;
  }

  async addPlatformToCollection(userId: string, dto: AddPlatformToCollectionDto) {
    const collections = await this.prisma.collection.findMany({
      where: {
        userId: userId,
      },
    });

    const platformStateDefault = {
      working: WorkingState.working,
      completed: CompletedItem.itemOnly,
      condition: ItemCondition.good,
      name: '',
      description: '',
    };

    const platform = await this.prisma.platformItem.create({
      data: {
        state: {
          create: platformStateDefault,
        },
        platform: {
          connect: {
            id: dto.platformId,
          },
        },
        collection: {
          connect: {
            id: collections[0].id,
          },
        },
        version: {
          connect: {
            id: dto.versionId,
          },
        },
      },
    });

    return platform;
  }

  async deletePlatformFromCollection(id: string) {
    const platform = await this.prisma.platformItem.delete({
      where: {
        id: id,
      },
    });

    return platform;
  }

  async deleteGameFromCollection(id: string) {
    const game = await this.prisma.gameItem.delete({
      where: {
        id: id,
      },
    });

    return game;
  }
}
