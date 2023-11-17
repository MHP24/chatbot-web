import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { RedisModule } from 'src/providers/cache/redis.module';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [RedisModule],
})
export class ChatModule {}
