import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'src/providers/cache/redis.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [BotService],
  exports: [BotService],
  imports: [ConfigModule, RedisModule, CommonModule],
})
export class BotModule {}
