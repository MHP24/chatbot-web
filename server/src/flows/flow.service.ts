import { Injectable } from '@nestjs/common';
import { BotService } from './bot/bot.service';
import { ClientMessage, SystemMessage } from '../common/types';

@Injectable()
export class FlowService {
  private flows: Record<
    string,
    (message: ClientMessage) => Promise<SystemMessage | null>
  >;

  constructor(private readonly botService: BotService) {
    this.flows = {
      bot: this.handleBotFlow.bind(this),
    };
  }

  private async handleBotFlow(
    message: ClientMessage,
  ): Promise<SystemMessage | null> {
    return this.botService.handleFlow(message);
  }

  async handleFlow(clientMessage: ClientMessage) {
    // TODO: add refresh
    const {
      context: { currentFlow },
    } = clientMessage;

    const flowExecution = this.flows[currentFlow];
    if (!flowExecution) {
      throw new Error(`Flow unsupported: ${currentFlow}`);
    }

    return await flowExecution(clientMessage);
  }
}
