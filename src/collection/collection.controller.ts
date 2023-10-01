import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getUser } from 'src/auth/decorator/get-user.decorator';
import { CreateCollectionDto } from './dto/collection.dto';
import { CollectionService } from './collection.service';

@ApiTags('collections')
@Controller('collection')
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

  @Post('create')
  createCollection(@getUser() userId: string, @Body() dto: CreateCollectionDto) {
    return this.collectionService.createCollection(userId, dto);
  }
}
