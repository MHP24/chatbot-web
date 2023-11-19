import { Injectable } from '@nestjs/common';
import {
  BotContext,
  // ChatContext,
  ClientMessage,
  SystemMessage,
} from '../../common/types';
import { handleOptionMessage } from '../helpers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BotService {
  constructor(private readonly configService: ConfigService) {}

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
    console.log({ botOutput });

    if (!context || botOutput) {
      // console.log(`chat:${sessionId}`, 'context', {
      //   ...context,
      //   bot: {
      //     currentMenu: data,
      //     data: botOutput,
      //     messages: [
      //       ...context.bot?.messages,
      //       {
      //         side: 'client',
      //         content: {
      //           type,
      //           data,
      //         },
      //       },
      //       {
      //         side: 'bot',
      //         content: botOutput,
      //       },
      //     ],
      //   },
      // });
      return botOutput;
    }
  }
}
