import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PlatformService } from './platform.service';
import { CreatePlatformDto, UpdatePlatformDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { AdminRoleGuard } from 'src/user/guard';

@Controller('platforms')
export class PlatformController {
  constructor(private platformService: PlatformService) {}

  @Get(':id')
  getPlatformById(@Param('id') id: string) {
    return this.platformService.getPlatformById(id);
  }

  @Get()
  getAllPlatforms(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
  ) {
    return this.platformService.getAllPlatform(skip, take);
  }

  @UseGuards(JwtGuard, AdminRoleGuard)
  @Post('create')
  createPlatform(@Body() dto: CreatePlatformDto) {
    return this.platformService.createPlatform(dto);
  }

  @UseGuards(JwtGuard, AdminRoleGuard)
  @Put('update/:id')
  updatePlatform(@Param('id') id: string, @Body() dto: UpdatePlatformDto) {
    return this.platformService.updatePlatform(id, dto);
  }

  @UseGuards(JwtGuard, AdminRoleGuard)
  @Delete(':id')
  deletePlatform(@Param('id') id: string) {
    return this.platformService.deletePlatform(id);
  }
}
