import { Module } from '@nestjs/common';
// * Modules
import { BotModule } from '../bot/bot.module';
import { RedisModule } from '../cache/redis.module';
import { EventsModule } from '../chat/events/events.module';
// * Services
import { FlowService } from './flow.service';
import { FlowsFactory } from './factories';

@Module({
  imports: [RedisModule, BotModule, EventsModule],
  providers: [FlowsFactory, FlowService],
  exports: [FlowService],
})
export class FlowModule {}
