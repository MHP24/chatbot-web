import { Injectable } from '@nestjs/common';
import {
  BotContext,
  ChatContext,
  ClientMessage,
  MessageType,
  SystemMessage,
} from '../../common/types';
import {
  handleActionMessage,
  handleInputMessage,
  handleOptionMessage,
} from '../helpers';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/providers/cache/redis.service';
import { BotResponse } from '../types';
import { buildBotContext } from '../helpers';

@Injectable()
export class BotService {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async handleFlow(clientMessage: ClientMessage): Promise<SystemMessage> {
    const supportedMessages: Record<
      string,
      (message: string, context: BotContext) => BotResponse
    > = {
      option: handleOptionMessage,
      action: handleActionMessage,
      input: handleInputMessage,
    };

    const { sessionId, context, message } = clientMessage;

    const { type = `${this.configService.get('DEFAULT_FLOW_KEY_TYPE')}` } =
      context.bot?.data ?? {};

    clientMessage.message.type = type as MessageType;

    const { data } = message;

    const messageHandling = supportedMessages[type];
    if (!messageHandling) return null;

    const botResponse = messageHandling(data, context.bot);

    const contextUpdated = buildBotContext({
      clientMessage,
      botResponse,
    });

    await this.redisService.update<ChatContext>(
      `chat:${sessionId}`,
      'context',
      contextUpdated,
    );

    return botResponse.response;
  }
}
