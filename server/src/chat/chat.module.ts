import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { RedisModule } from 'src/providers/cache/redis.module';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';
import { FlowModule } from 'src/flows/flow.module';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [ConfigModule, RedisModule, CommonModule, FlowModule],
})
export class ChatModule {}
