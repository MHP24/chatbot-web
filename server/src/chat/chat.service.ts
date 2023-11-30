import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Socket } from 'socket.io';
import { RedisService } from 'src/providers/cache/redis.service';
import { Chat, EntryClientMessage } from '../common';
import { FlowService } from 'src/flows/flow.service';
import { EventsService } from './events';
import { PrismaService } from 'src/providers/prisma/mysql/prisma.service';

@Injectable()
export class ChatService {
  logger = new Logger('ChatService');
  chatTimeouts = new Map<string, { tout: NodeJS.Timeout }>();

  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly prismaService: PrismaService,
    private readonly eventsService: EventsService,
    private readonly flowService: FlowService,
  ) {}

  // * For new and current clients that already have a chat instance
  async onConnect(client: Socket, chatId: string) {
    try {
      this.logger.log(`Connected: ${chatId}`);

      const chat = await this.redisService.get<Chat>(`chat:${chatId}`);
      const conversationId = chat?.chatId ?? chatId;
      this.revalidateChat(conversationId);

      if (chat) {
        // TODO: Emit load
        this.logger.log(`${conversationId} loaded`);
        return;
      }

      await this.prismaService.chat.create({
        data: {
          chatId: conversationId,
          chatInstance: this.configService.get('CHAT_INSTANCE'),
        },
      });

      this.eventsService.emitSessionEvent({
        client,
        chatId: conversationId,
        flow: this.configService.get('DEFAULT_FLOW'),
      });

      await this.flowService.handleFlow(conversationId, null);
    } catch (error) {
      this.logger.error(`Failed initializing chat ${error}`);
    }
  }

  // * Messages from client side
  async onMessage(chatId: string, message: EntryClientMessage) {
    try {
      this.revalidateChat(chatId);
      await this.flowService.handleFlow(chatId, message);
    } catch (error) {
      this.logger.error(error);
    }
  }

  // * Disconnections from client side
  async onDisconnect(chatId: string) {
    try {
      this.logger.log(`Disconnected: ${chatId}`);
    } catch (error) {
      this.logger.error(error);
    }
  }

  // * Revalidation for inactivity on chats (must be used on messages)
  async revalidateChat(chatId: string) {
    const chatTimeout = this.chatTimeouts.get(chatId);
    clearTimeout(chatTimeout?.tout);

    // * Close for inactivity
    this.chatTimeouts.set(chatId, {
      tout: setTimeout(
        () => this.closeChat(chatId, true),
        this.configService.get('CHAT_TIMEOUT') * 1000,
      ),
    });
  }

  // * Close on chat emitter or inactivity
  async closeChat(chatId: string, idle: boolean = false) {
    try {
      const chat = await this.redisService.get<Chat>(`chat:${chatId}`);
      if (!chat) return;

      await this.redisService.delete(`chat:${chatId}`);

      // * DB update with conversation and status code 2 = idle, 3 = finished
      await this.prismaService.chat.update({
        where: {
          chatId,
        },
        data: {
          status: idle ? 2 : 3,
          conversation: JSON.stringify(chat),
          endDate: new Date(),
        },
      });

      //TODO: add close emitter
    } catch (error) {
      this.logger.error(error);
    }
  }
}
