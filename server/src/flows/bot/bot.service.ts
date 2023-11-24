import { Injectable } from '@nestjs/common';
import { BotContext, FlowEntry } from '../types';

@Injectable()
export class BotService {
  // TODO: Inject handleEntry, handleOutput

  handleFlow(data: FlowEntry<BotContext>): any {
    const { chatId, message, context } = data;
    if (!context) {
      // TODO: Create bot context
      // TODO: Get default entry (check the type action, transfer case)
      // TODO: Adapt the output
      // TODO: Save on db after checking and formatting (current menu)
    }
    console.log({ chatId, message, context });
  }
}
