import { Module } from '@nestjs/common';
// * Chat...
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatsController } from './chat.controller';
// * Modules
import { FlowModule } from '../flows/flow.module';
import { EventsModule } from './events/events.module';
import { RedisModule } from '../cache/redis.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [RedisModule, PrismaModule, FlowModule, EventsModule],
  providers: [ChatGateway, ChatService],
  controllers: [ChatsController],
  exports: [],
})
export class ChatModule {}
