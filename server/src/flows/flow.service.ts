import { Injectable } from '@nestjs/common';
import { BotService } from './bot/bot.service';
import { ClientMessage, EntryClientMessage, SystemMessage } from '../common';

@Injectable()
export class FlowService {
  private flows: Record<
    string,
    (message: ClientMessage) => Promise<SystemMessage | null>
  >;

  constructor(private readonly botService: BotService) {
    this.flows = {
      // bot: this.handleBotFlow.bind(this),
    };
  }

  async handleFlow(chatId: string, data: EntryClientMessage) {
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

  // private async handleBotFlow(
  //   message: ClientMessage,
  // ): Promise<SystemMessage | null> {
  //   return this.botService.handleFlow(message);
  // }
}
