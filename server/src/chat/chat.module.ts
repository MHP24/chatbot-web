import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { RedisModule } from 'src/providers/cache/redis.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [RedisModule, CommonModule],
})
export class ChatModule {}
