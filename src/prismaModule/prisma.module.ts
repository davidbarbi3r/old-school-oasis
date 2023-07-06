import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 👈 we make this module global so we can import it in other modules we just have to define the service in the constructor of the service we want to use it in
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
