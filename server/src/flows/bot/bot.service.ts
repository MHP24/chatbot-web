import { Injectable } from '@nestjs/common';
import {
  BotContext,
  ChatContext,
  ClientMessage,
  EntryClientMessage,
  MessageType,
  SystemMessage,
} from '../../common/types';
import { handleInputMessage, handleOptionMessage } from '../helpers';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/providers/cache/redis.service';

@Injectable()
export class BotService {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async handleFlow({
    sessionId,
    message,
    context,
  }: ClientMessage): Promise<SystemMessage> {
    const supportedMessages: Record<
      string,
      (message: string, context: BotContext) => SystemMessage
    > = {
      option: handleOptionMessage,
      input: handleInputMessage,
    };

    const { type = `${this.configService.get('DEFAULT_FLOW_KEY_TYPE')}` } =
      context.bot?.data ?? {};

    const { data } = message;

    const messageHandling = supportedMessages[type];
    if (!messageHandling) return null;

    const botResponse = messageHandling(data, context.bot);

    if (!context || botResponse) {
      // TODO: move to helper

      const clientMessage: EntryClientMessage = {
        type: type as MessageType,
        message: data,
      };

      const contextUpdated: ChatContext = {
        ...context,
        bot: {
          currentMenu: data,
          data: botResponse,
          messages: [
            ...(context.bot?.messages ?? []),
            {
              side: 'client',
              content: clientMessage,
            },
            {
              side: 'bot',
              content: botResponse,
            },
          ],
        },
      };

      this.redisService.update<ChatContext>(
        `chat:${sessionId}`,
        'context',
        contextUpdated,
      );

      return botResponse;
    }
  }
}
