import { Controller, Get, Param } from '@nestjs/common';
import { IgdbService } from './igdb.service';

@Controller('igdb')
export class IgdbController {
  constructor(private igdbService: IgdbService) {}
  @Get('auth')
  getAuth() {
    return this.igdbService.getIgdbAuth();
  }

  @Get('searchGame/:name')
  searchGamesByName(@Param('name') name: string) {
    return this.igdbService.searchIgdbGames(name);
  }

  @Get('searchPlatform/:name')
  searchPlatformsByName(@Param('name') name: string) {
    return this.igdbService.searchIgdbPlatforms(name);
  }

  @Get('searchPlatformVersion/:name')
  searchPlatformVersionsByName(@Param('name') name: string) {
    return this.igdbService.searchPlatformVersions(name);
  }
}
