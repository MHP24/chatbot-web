import { Injectable } from '@nestjs/common';
import { BotService } from './bot/bot.service';
import { ClientMessage, SystemMessage } from '../common/types';

@Injectable()
export class FlowService {
  // TODO: 3 flows..
  // ! Flow declaration and support

  //TODO: define return and type for flow processing and agent processing
  flows: Record<string, (message: ClientMessage) => SystemMessage | null> = {
    bot: this.botService.handleFlow,
  };

  constructor(private readonly botService: BotService) {}

  handleFlow(message: ClientMessage) {
    // TODO: get context of conversation and send to flows
    console.log({ message });

    const {
      context: { currentFlow },
    } = message;

    const flowExecution = this.flows[currentFlow];
    if (!flowExecution) throw new Error(`Flow unsupported: ${currentFlow}`);

    return flowExecution(message);
  }
}
