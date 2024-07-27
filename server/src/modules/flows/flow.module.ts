import { Module } from '@nestjs/common';
// * Modules
import { BotModule } from '../bot/bot.module';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../chat/events/events.module';
// * Services
import { FlowService } from './flow.service';

@Module({
  imports: [RedisModule, BotModule, EventsModule],
  providers: [FlowService],
  exports: [FlowService],
})
export class FlowModule { }
