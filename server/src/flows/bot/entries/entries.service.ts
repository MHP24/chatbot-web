import { Injectable } from '@nestjs/common';
import { BotHandler } from '../interfaces';
import { FlowEntry, BotContext, Menu, BotMenu } from 'src/flows/types';
import { InputService, OptionService } from './handlers';

@Injectable()
export class EntriesService implements BotHandler {
  private handlers: Record<
    string,
    (data: FlowEntry<BotContext>) => BotMenu<Menu> | Promise<BotMenu<Menu>>
  >;

  constructor(
    private readonly inputService: InputService,
    private readonly optionService: OptionService,
  ) {
    this.handlers = {
      option: this.handleOption.bind(this),
    };
  }

  handler(data: FlowEntry<BotContext>): BotMenu<Menu> | Promise<BotMenu<Menu>> {
    const typeHandler = this.handlers[data.context.currentMenu.type];
    if (!typeHandler) return null;

    return typeHandler(data);
  }

  handleOption(data: FlowEntry<BotContext>) {
    return this.optionService.handleOption(data);
  }
}
