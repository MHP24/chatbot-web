import { Injectable } from '@nestjs/common';
import {
  BotContext,
  ChatContext,
  ClientMessage,
  SystemMessage,
} from '../../common/types';
import { handleOptionMessage } from '../helpers';
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
    };

    const { data, type } = !context
      ? {
          type: this.configService.get('DEFAULT_FLOW_KEY_TYPE'),
          data: this.configService.get('DEFAULT_FLOW_KEY'),
        }
      : message;

    const messageHandling = supportedMessages[type];
    if (!messageHandling) return null;

    const botOutput = messageHandling(data, context.bot);

    // TODO: if botOutput is null return a invalid option and current options
    console.log(JSON.stringify(botOutput, null, 2));

    if (!context || botOutput) {
      const contextUpdated: ChatContext = {
        ...context,
        bot: {
          currentMenu: data,
          data: botOutput,
          messages: [
            ...(context.bot?.messages ?? []),
            {
              side: 'client',
              content: {
                type,
                data,
              },
            },
            {
              side: 'bot',
              content: botOutput,
            },
          ],
        },
      };

      this.redisService.update<ChatContext>(
        `chat:${sessionId}`,
        'context',
        contextUpdated,
      );

      return botOutput;
    }
  }
}
