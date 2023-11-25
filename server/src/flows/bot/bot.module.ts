import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotService } from './bot.service';
import { RedisModule } from 'src/providers/cache/redis.module';

@Module({
  providers: [BotService],
  exports: [BotService],
  imports: [ConfigModule, RedisModule],
})
export class BotModule {}
