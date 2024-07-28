import { Injectable } from '@nestjs/common';
import { BotEntryHandler } from '../interfaces';
import { InputService, OptionService } from './handlers';
import { BotContext, BotEntryResponse } from '../types';
import { FlowEntry } from '../../flows/types';

@Injectable()
export class EntriesService implements BotEntryHandler {
  private handlers: Record<
    string,
    (data: FlowEntry<BotContext>) => Promise<BotEntryResponse>
  >;

  constructor(
    private readonly inputService: InputService,
    private readonly optionService: OptionService,
  ) {
    this.handlers = {
      option: this.handleOption.bind(this),
      input: this.handleInput.bind(this),
    };
  }

  async handler(data: FlowEntry<BotContext>): Promise<BotEntryResponse> {
    const typeHandler = this.handlers[data.context.currentMenu.type];
    if (!typeHandler) return null;

    return await typeHandler(data);
  }

  private handleOption(data: FlowEntry<BotContext>) {
    return this.optionService.handleOption(data);
  }

  private handleInput(data: FlowEntry<BotContext>) {
    return this.inputService.handleInput(data);
  }
}
