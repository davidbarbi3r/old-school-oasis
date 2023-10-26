import {
  Body,
  Controller,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GameService } from './game.service';
import { CreateGameDto, UpdateGameDto } from './dto';
import { AdminRoleGuard } from 'src/user/guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('games')
@Controller('games')
export class GameController {
  constructor(private gameService: GameService) {}

  @ApiOperation({ summary: 'Get game by id' })
  @ApiResponse({ status: 200, description: 'Return game by id' })
  @ApiResponse({ status: 404, description: 'Game not found' })
  @ApiResponse({ status: 403, description: 'Unauthorized' })
  @UseGuards(JwtGuard)
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

  @Get('platform/:id')
  getGamesByPlatform(
    @Param('id', ParseIntPipe) id: number,
    @Query('skip', ParseIntPipe) skip?: number,
    @Query('take', ParseIntPipe) take?: number,
  ) {
    return this.gameService.getGamesByPlatform(id, skip, take);
  }

  @Get('all/:platform')
  getAllGames(
    @Param('platform') platform: string,
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
  ) {
    return this.gameService.getAllGames(platform, skip, take);
  }

  /*@UseGuards(JwtGuard, AdminRoleGuard)*/
  @Post('create')
  createGame(@Body() dto: CreateGameDto) {
    return this.gameService.createGame(dto);
  }

  @UseGuards(JwtGuard, AdminRoleGuard)
  @Put('update/:id')
  updateGame(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGameDto) {
    return this.gameService.updateGame(id, dto);
  }

  @UseGuards(JwtGuard, AdminRoleGuard)
  @Delete('delete/:id')
  deleteGame(@Param('id', ParseIntPipe) id: number) {
    return this.gameService.deleteGame(id);
  }
}
