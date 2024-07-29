import { Injectable } from '@nestjs/common';
import { FlowI, FlowsCreator } from '../interfaces';
import { Flow } from '../types';
import { BotService } from '../../bot/bot.service';

@Injectable()
export class FlowsFactory implements FlowsCreator {
  constructor(private readonly botFlow: BotService) {}

  handleFlowCreation(flow: Flow): FlowI {
    const flows: Record<string, FlowI> = {
      [Flow.bot]: this.botFlow,
    };

    const flowInstance = flows[flow];
    if (!flowInstance) {
      throw new Error(`Flow: ${flow} not found`);
    }
    return flowInstance;
  }
}
