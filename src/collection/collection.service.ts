import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prismaModule/prisma.service';
import { CreateCollectionDto } from './dto/collection.dto';

@Injectable()
export class CollectionService {
  constructor(private prisma: PrismaService) {}

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
}
