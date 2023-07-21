import { Module } from '@nestjs/common';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [PlatformController],
  providers: [PlatformService],
  imports: [UserModule],
})
export class PlatformModule {}
