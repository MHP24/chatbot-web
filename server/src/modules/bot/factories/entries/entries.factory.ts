import { Injectable } from '@nestjs/common';
import { BotEntryHandler, EntriesCreator } from '../../interfaces';
import { BotMessageType } from '../../types';
import { InputService } from './services/input.service';
import { OptionService } from './services/option.service';

@Injectable()
export class EntriesFactory implements EntriesCreator {
  constructor(
    private readonly optionService: OptionService,
    private readonly inputService: InputService,
  ) {}

  handleEntriesCreation(botMessageType: BotMessageType): BotEntryHandler {
    const entriesHandlers = {
      [BotMessageType.option]: this.optionService,
      [BotMessageType.input]: this.inputService,
    };

    return entriesHandlers[botMessageType];
  }
}
