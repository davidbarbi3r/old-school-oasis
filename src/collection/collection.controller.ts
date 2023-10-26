import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getUser } from 'src/auth/decorator/get-user.decorator';
import { AddGameToCollectionDto, CreateCollectionDto } from './dto/collection.dto';
import { CollectionService } from './collection.service';
import { JwtGuard } from '../auth/guard';

@ApiTags('collections')
@Controller('collections')
export class CollectionController {
  constructor(private collectionService: CollectionService) {}

  @Get('all')
  async getAllCollections() {
    return await this.collectionService.getAllCollections();
  }

  @Get('my')
  async getMyCollections(@getUser() userId: string) {
    return await this.collectionService.getMyCollections(userId);
  }

  @Get(':id')
  async getCollectionById(@Query() id: string) {
    return await this.collectionService.getCollectionById(id);
  }

  @Post('addGame')
  async addGameToCollection(@getUser() userId: string, @Body() dto: AddGameToCollectionDto) {
    return await this.collectionService.addGameToCollection(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Post('create')
  createCollection(@getUser() userId: string, @Body() dto: CreateCollectionDto) {
    return this.collectionService.createCollection(userId, dto);
  }
}
