import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// * Modules
import { BotModule } from '../bot/bot.module';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../chat/events/events.module';
// * Services
import { FlowService } from './flow.service';

@Module({
  imports: [ConfigModule, RedisModule, BotModule, EventsModule],
  providers: [FlowService],
  exports: [FlowService],
})
export class FlowModule {}
