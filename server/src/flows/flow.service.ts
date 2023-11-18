import { Injectable } from '@nestjs/common';
import { BotService } from './bot/bot.service';
import { Message } from '../common/types';

@Injectable()
export class FlowService {
  // TODO: 3 flows..
  // ! Flow declaration and support
  flows: Record<string, (message: Message) => any> = {
    bot: this.botService.handleFlow,
  };

  constructor(private readonly botService: BotService) {}

  handleFlow(message: Message) {
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
