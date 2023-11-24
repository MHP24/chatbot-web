import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Socket } from 'socket.io';
import { ChatEventsService } from './chat-events.service';
import { RedisService } from 'src/providers/cache/redis.service';
import { Chat } from '../common';
import { FlowService } from 'src/flows/flow.service';

@Injectable()
export class ChatService {
  logger = new Logger('ChatService');

  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly chatEventsService: ChatEventsService,
    private readonly flowService: FlowService,
  ) {}

  async onConnect(client: Socket, chatId: string) {
    const chat = await this.redisService.get<Chat>(`chat:${chatId}`);
    const conversationId = chat?.chatId ?? chatId;

    if (chat) {
      // TODO: Emit load
      this.logger.log(`${conversationId} loaded`);
      return;
    }

    await this.flowService.handleFlow(conversationId, null);

    this.chatEventsService.emitSessionEvent({
      client,
      chatId,
      flow: this.configService.get('DEFAULT_FLOW'),
    });
  }
}
