import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GameService } from './game.service';
import { CreateGameDto, UpdateGameDto } from './dto';
import { AdminRoleGuard } from 'src/user/guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('games')
@Controller('games')
export class GameController {
  constructor(private gameService: GameService) {
  }

  @ApiOperation({ summary: 'Get game by id' })
  @ApiResponse({ status: 200, description: 'Return game by id' })
  @ApiResponse({ status: 404, description: 'Game not found' })
  @ApiResponse({ status: 403, description: 'Unauthorized' })
  @Get(':id')
  getGameById(@Param('id', ParseIntPipe) id: number) {
    return this.gameService.getGameById(id);
  }

  @ApiOperation({ summary: 'Search game by name' })
  @ApiResponse({ status: 200, description: 'Return games by name' })
  @ApiResponse({ status: 404, description: 'No games found' })
  /* @UseGuards(JwtGuard)*/
  @Get('search/:name')
  searchGamesByName(@Param('name') name: string) {
    return this.gameService.getGamesByName(name);
  }

  @Get('search/:name/:platform')
  searchGamesByNameAndPlatform(@Param('name') name: string, @Param('platform', ParseIntPipe) platformId: number) {
    return this.gameService.getGamesByNameAndPlatform(name, platformId);
  }

  @Get('platform/:id')
  getGamesByPlatform(
    @Param('id', ParseIntPipe) id: number,
    @Query('skip', ParseIntPipe) skip?: number,
    @Query('take', ParseIntPipe) take?: number,
  ) {
    return this.gameService.getGamesByPlatform(id, skip, take);
  }

  @Get('all/:platformId')
  getAllGames(
    @Param('platformId', ParseIntPipe) platformId: number,
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
  ) {
    return this.gameService.getAllGames(platformId, skip, take);
  }

  @Get('/mostCollected/:platform')
  getTopCollectedGames(@Param('platform') platform?: string, @Query('limit') limit?: string) {
    return this.gameService.getTopCollectedGames(platform, limit);
  }

  @Get('/bestRated/:platform')
  getTopRatedGames(@Param('platform') platform?: string, @Query('limit') limit?: string) {
    return this.gameService.getTopRatedGames(platform, limit);
  }

  /*@UseGuards(JwtGuard, AdminRoleGuard)*/
  @Post()
  createGame(@Body() dto: CreateGameDto) {
    return this.gameService.createGame(dto);
  }

  @UseGuards(JwtGuard, AdminRoleGuard)
  @Put(':id')
  updateGame(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGameDto) {
    return this.gameService.updateGame(id, dto);
  }

  @UseGuards(JwtGuard, AdminRoleGuard)
  @Delete(':id')
  deleteGame(@Param('id', ParseIntPipe) id: number) {
    return this.gameService.deleteGame(id);
  }
}
