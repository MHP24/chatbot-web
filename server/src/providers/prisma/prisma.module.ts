import { Module } from '@nestjs/common';
import { PrismaService } from './mysql/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
