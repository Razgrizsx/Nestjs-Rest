import { Global, Module } from '@nestjs/common';
import { PrismadbService } from './prismadb.service';

@Global()
@Module({
  exports: [PrismadbService],
  providers: [PrismadbService]
})
export class PrismadbModule {}
