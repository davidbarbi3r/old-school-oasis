import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getUser } from 'src/auth/decorator/get-user.decorator';
import { CreateCollectionDto } from './dto/collection.dto';
import { CollectionService } from './collection.service';

@ApiTags('collections')
@Controller('collection')
export class CollectionController {
  constructor(private collectionService: CollectionService) {}
  @Post('create')
  createCollection(@getUser() userId: string, @Body() dto: CreateCollectionDto) {
    return this.collectionService.createCollection(userId, dto);
  }
}
