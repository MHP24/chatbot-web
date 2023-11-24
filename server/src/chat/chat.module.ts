import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '../providers/cache/redis.module';

import { FlowModule } from '../flows/flow.module';
import { ChatEventsService } from './chat-events.service';

@Module({
  providers: [ChatGateway, ChatService, ChatEventsService],
  imports: [ConfigModule, RedisModule, FlowModule],
})
export class ChatModule {}
