import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { GenerateIdAdapter } from '../../common/adapters';
// * Services
import { RedisService } from '../cache/redis.service';
import { FlowService } from '../flows/flow.service';
import { PrismaService } from '../prisma/mysql/prisma.service';
import { EventsService } from './events/events.service';
// * Types
import { Chat, EntryClientMessage } from './types';
import { envs } from '../../common/config';

@Injectable()
export class ChatService {
  private logger = new Logger(ChatService.name);
  private chatTimeouts = new Map<string, { tout: NodeJS.Timeout }>();
  private generateId = new GenerateIdAdapter();

  constructor(
    private readonly redisService: RedisService,
    private readonly prismaService: PrismaService,
    private readonly eventsService: EventsService,
    private readonly flowService: FlowService,
  ) {}

  // * Handle new or existing chat using HTTP
  async handleChatRequest(chatId: string) {
    const chat = await this.redisService.get<Chat>(`chat:${chatId}`);
    return {
      chatId: chat?.chatId ?? this.generateId.generate(),
    };
  }

  // * For new and current clients that already have a chat instance
  async onConnect(client: Socket, chatId: string) {
    try {
      this.logger.log(`Connected: ${chatId}`);

      const chat = await this.redisService.get<Chat>(`chat:${chatId}`);
      const conversationId = chat?.chatId ?? chatId;
      this.revalidateChat(conversationId);

      if (chat) {
        this.eventsService.emitLoadEvent({
          chatId,
          client,
          messages: chat.context[chat.context.currentFlow].history,
        });
        this.logger.log(`Loaded: ${conversationId}`);
        return;
      }

      await this.prismaService.chat.create({
        data: {
          chatId: conversationId,
          chatInstance: envs.chatInstance,
        },
      });

      this.eventsService.emitSessionEvent({
        client,
        chatId: conversationId,
        flow: envs.defaultFlow,
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
        envs.chatTimeout * 1000,
      ),
    });
  }

  // * Close on chat emitter or inactivity
  async closeChat(chatId: string, idle: boolean = false) {
    try {
      const chat = await this.redisService.get<Chat>(`chat:${chatId}`);
      if (!chat) return;

      clearTimeout(this.chatTimeouts.get(chatId)?.tout);
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

      // * Timeout emitter to the client
      idle &&
        this.eventsService.emitTimeoutEvent({
          chatId,
          reason: 'El chat se ha cerrado por inactividad prolongada.',
        });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
