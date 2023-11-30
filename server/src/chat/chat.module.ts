import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RedisModule } from '../providers/cache/redis.module';

import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

import { FlowModule } from '../flows/flow.module';
import { EventsModule } from './events';
import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { ChatsController } from './chat.controller';

@Module({
  providers: [ChatGateway, ChatService],
  controllers: [ChatsController],
  exports: [],
  imports: [
    ConfigModule,
    RedisModule,
    PrismaModule,
    FlowModule,
    EventsModule,
    CommonModule,
  ],
})
export class ChatModule {}
