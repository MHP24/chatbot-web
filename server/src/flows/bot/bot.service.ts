import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
import { RedisService } from 'src/providers/cache/redis.service';
import { BotResponse } from '../types';
import { buildBotContext } from '../helpers';
import { BotClientResponseAdapter } from 'src/common/adapters';
import { ActionsService } from './actions/actions.service';

@Injectable()
export class BotService {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly botClientResponseAdapter: BotClientResponseAdapter,
    private readonly actionsService: ActionsService,
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

    // const { type: entryType } = clientMessage.message;
    const { sessionId, context, message } = clientMessage;

    const { type = `${this.configService.get('DEFAULT_FLOW_KEY_TYPE')}` } =
      context.bot?.data ?? {};

    clientMessage.message.type = type as MessageType;

    const { data } = message;

    const messageHandling = supportedMessages[type];

    if (!messageHandling) return null;

    const botOutput = messageHandling(data, context.bot);

    const { action } = botOutput;

    const botResponse = action
      ? this.actionsService.handleNextStep(
          action.type,
          botOutput.response,
          action.answers,
        )
      : botOutput.response;

    console.log({ botResponse });

    const contextUpdated = buildBotContext({
      clientMessage,
      botResponse: botOutput as BotResponse,
    });

    // if (entryType === 'option' && botResponse.response) {
    //   // TODO: store in db
    //   console.log({
    //     session: clientMessage.sessionId,
    //     input: message.data,
    //     tree: botResponse.response,
    //   });
    // }

    await this.redisService.update<ChatContext>(
      `chat:${sessionId}`,
      'context',
      contextUpdated,
    );

    // ! Adapter for client (primitive types, input, option)
    const adapterForClient = this.botClientResponseAdapter.adapt(botResponse);

    return {
      ...(adapterForClient as SystemMessage),
      timestamp: clientMessage.timestamp,
      hasToClose: botResponse.type === 'close',
    };
  }
}
