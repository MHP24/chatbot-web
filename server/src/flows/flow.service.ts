import { Injectable, Logger } from '@nestjs/common';
import { BotService } from './bot/bot.service';
import {
  Chat,
  ClientMessage,
  EntryClientMessage,
  SystemMessage,
} from '../common';
import { RedisService } from 'src/providers/cache/redis.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FlowService {
  private logger = new Logger('FlowService');

  private flows: Record<
    string,
    (message: ClientMessage) => Promise<SystemMessage | null>
  >;

  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly botService: BotService,
  ) {
    this.flows = {
      // bot: this.handleBotFlow.bind(this),
    };
  }

  async handleFlow(chatId: string, data: EntryClientMessage | null) {
    if (!data && chatId) {
      await this.joinToFlow(chatId);
    }
    console.log({ chatId, data });
    // const chat = await this.redisService.get<Chat>(`chat:${sessionId}`);
    // const {
    //   context: { currentFlow },
    // } = clientMessage;

    // const flowExecution = this.flows[currentFlow];
    // if (!flowExecution) {
    //   throw new Error(`Flow not supported: ${currentFlow}`);
    // }

    // return await flowExecution(clientMessage);
  }

  async joinToFlow(chatId: string) {
    try {
      const timestamp = Number(new Date());

      const chatInitialContext = {
        chatId,
        lastUserInteraction: timestamp,
        startedAt: timestamp,
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

  // private async handleBotFlow(
  //   message: ClientMessage,
  // ): Promise<SystemMessage | null> {
  //   return this.botService.handleFlow(message);
  // }
}
