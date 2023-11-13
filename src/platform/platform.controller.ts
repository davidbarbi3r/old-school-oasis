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
  getPlatformById(@Param('id', ParseIntPipe) id: number) {
    return this.platformService.getPlatformById(id);
  }

  @Get('search/:name')
  searchPlatformsByName(@Param('name') name: string, @Query('take', ParseIntPipe) take: number) {
    return this.platformService.getPlatformByName(name, take);
  }

  @Get()
  getAllPlatforms(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
  ) {
    return this.platformService.getAllPlatform(skip, take);
  }

  @Get('starter/:id')
  getPlatformsStarter(@Param('id', ParseIntPipe) id: number) {
    return this.platformService.getPlatformsStarter(id);
  }

  @UseGuards(JwtGuard, AdminRoleGuard)
  @Post()
  createPlatform(@Body() dto: CreatePlatformDto) {
    return this.platformService.createPlatform(dto);
  }

  @UseGuards(JwtGuard, AdminRoleGuard)
  @Put(':id')
  updatePlatform(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePlatformDto) {
    return this.platformService.updatePlatform(id, dto);
  }

  @UseGuards(JwtGuard, AdminRoleGuard)
  @Delete(':id')
  deletePlatform(@Param('id', ParseIntPipe) id: number) {
    return this.platformService.deletePlatform(id);
  }
}
