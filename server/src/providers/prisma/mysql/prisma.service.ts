import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@mysql/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  logger = new Logger('PrismaService');

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Connected');
    } catch (error) {
      this.logger.error(error);
    }
  }
}
