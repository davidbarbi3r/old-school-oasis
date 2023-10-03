import { Module } from '@nestjs/common';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';
import { UserModule } from 'src/user/user.module';
import { IgdbModule } from '../igdb/igdb.module';

@Module({
  controllers: [PlatformController],
  providers: [PlatformService],
  imports: [UserModule, IgdbModule],
})
export class PlatformModule {}
