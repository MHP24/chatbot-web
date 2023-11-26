import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Socket } from 'socket.io';
import { RedisService } from 'src/providers/cache/redis.service';
import { Chat } from '../common';
import { FlowService } from 'src/flows/flow.service';
import { EventsService } from './events';

@Injectable()
export class ChatService {
  logger = new Logger('ChatService');

  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly eventsService: EventsService,
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

    this.eventsService.emitSessionEvent({
      client,
      chatId,
      flow: this.configService.get('DEFAULT_FLOW'),
    });
  }
}
