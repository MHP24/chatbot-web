import { Injectable } from '@nestjs/common';
import { BotContext, FlowEntry } from '../types';

@Injectable()
export class BotService {
  handleFlow(data: FlowEntry<BotContext>): any {
    const { chatId, message, context } = data;
    console.log({ chatId, message, context });
  }
}
