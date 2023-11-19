import { Injectable } from '@nestjs/common';
import { BotService } from './bot/bot.service';
import { ClientMessage, SystemMessage } from '../common/types';

@Injectable()
export class FlowService {
  flows: Record<
    string,
    (message: ClientMessage) => Promise<SystemMessage | null>
  > = {
    bot: this.botService.handleFlow,
  };

  constructor(private readonly botService: BotService) {}

  async handleFlow(clientMessage: ClientMessage) {
    console.log({ clientMessage });
    const {
      context: { currentFlow },
    } = clientMessage;

    const flowExecution = this.flows[currentFlow];
    if (!flowExecution) throw new Error(`Flow unsupported: ${currentFlow}`);

    return await flowExecution(clientMessage);
  }
}
