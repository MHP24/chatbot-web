import { Injectable } from '@nestjs/common';
import { BotHandler } from '../interfaces';
import { FlowEntry, BotContext, Menu, BotMenu } from 'src/flows/types';
import { InputService, OptionService } from './handlers';

@Injectable()
export class EntriesService implements BotHandler {
  constructor(
    private readonly inputService: InputService,
    private readonly optionService: OptionService,
  ) {}

  handler(context: FlowEntry<BotContext>): BotMenu<Menu> {
    this.inputService.handleInput();
    this.optionService.handleOption();
    return null;
  }
}
