import { Injectable, Logger } from '@nestjs/common';
// * Services
import { RedisService } from '../cache/redis.service';
import { EventsService } from '../chat/events/events.service';
// * Types
import { Chat } from '../chat/types/chat';
import { EntryClientMessage } from '../chat/types/message';
import { envs } from '../../common/config';
import { FlowsFactory } from './factories';

@Injectable()
export class FlowService {
  private logger = new Logger('FlowService');

  constructor(
    private readonly redisService: RedisService,
    private readonly eventsService: EventsService,
    private readonly flowsFactory: FlowsFactory,
  ) {}

  async handleFlow(chatId: string, message: EntryClientMessage | null) {
    const chat =
      (await this.redisService.get<Chat>(`chat:${chatId}`)) ??
      (await this.joinToFlow(chatId));

    const { currentFlow } = chat.context;
    const flowInstance = this.flowsFactory.handleFlowCreation(currentFlow);

    const flowResponse = await flowInstance.handleFlow({
      chatId,
      message,
      context: chat.context[currentFlow],
    });

    //TODO: Refactor
    // * When the flow has response...
    if (flowResponse) {
      //* On messages from flow
      flowResponse.type === 'message' &&
        this.eventsService.emitMessageEvent({
          chatId,
          message: {
            ...flowResponse.response,
            timestamp: flowResponse.timestamp,
          },
        });

      // * On close
      flowResponse.type === 'close' &&
        this.eventsService.emitCloseEvent({
          chatId,
          message: {
            ...flowResponse.response,
            timestamp: flowResponse.timestamp,
          },
        });
    }
  }

  /*
   * Add chat/user to the chat tmp db and starts conversation
   * using the default data managed by the default flow
   */
  async joinToFlow(chatId: string): Promise<Chat> {
    try {
      const chatInitialContext: Chat = {
        chatId,
        startedAt: Number(new Date()),
        context: {
          currentFlow: envs.defaultFlow,
        },
      };

      await this.redisService.set<Chat>(`chat:${chatId}`, chatInitialContext);
      this.logger.log(`Chat initialized for ${chatId}`);

      return chatInitialContext;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
