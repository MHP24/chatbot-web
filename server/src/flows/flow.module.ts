import { Module } from '@nestjs/common';
import { FlowService } from './flow.service';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'src/providers/cache/redis.module';
import { EventsModule } from 'src/chat/events';

@Module({
  providers: [FlowService],
  exports: [FlowService],
  imports: [ConfigModule, RedisModule, BotModule, EventsModule],
})
export class FlowModule {}
