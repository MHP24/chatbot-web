import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BotContext, FlowEntry, FlowResponse } from './types';
import { Chat, EntryClientMessage } from '../common';
import { RedisService } from '../providers/cache/redis.service';
import { BotService } from './bot/bot.service';
import { EventsService } from '../chat/events';

@Injectable()
export class FlowService {
  private logger = new Logger('FlowService');

  private flows: Record<
    string,
    (data: FlowEntry<void>) => Promise<FlowResponse | null>
  >;

  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly botService: BotService,
    private readonly eventsService: EventsService,
  ) {
    this.flows = {
      bot: this.handleBotFlow.bind(this),
    };
  }

  async handleFlow(chatId: string, message: EntryClientMessage | null) {
    const chat =
      (await this.redisService.get<Chat>(`chat:${chatId}`)) ??
      (await this.joinToFlow(chatId));

    const { currentFlow } = chat.context;

    const flowExecution = this.flows[currentFlow];
    if (!flowExecution) {
      throw new Error(`Flow not supported: ${currentFlow}`);
    }

    const flowResponse = await flowExecution({
      chatId,
      message,
      context: chat.context[currentFlow],
    });

    flowResponse.type === 'bot-message' &&
      this.eventsService.emitMessageEvent({
        ...flowResponse.response,
        timestamp: flowResponse.timestamp,
      });
  }

  private async handleBotFlow(
    data: FlowEntry<BotContext>,
  ): Promise<FlowResponse> {
    return this.botService.handleFlow(data);
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
          currentFlow: this.configService.get('DEFAULT_FLOW'),
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
