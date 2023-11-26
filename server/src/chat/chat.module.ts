import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RedisModule } from '../providers/cache/redis.module';

import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

import { FlowModule } from '../flows/flow.module';
import { EventsModule } from './events';

@Module({
  providers: [ChatGateway, ChatService],
  exports: [],
  imports: [ConfigModule, RedisModule, FlowModule, EventsModule],
})
export class ChatModule {}
