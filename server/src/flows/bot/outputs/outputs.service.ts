import { Injectable } from '@nestjs/common';
import { BotMenu, Input, Option, BotOutputData } from 'src/flows/types';
import { ActionService } from './handlers';
import { BotOutputHandler } from '../interfaces';

@Injectable()
export class OutputsService implements BotOutputHandler {
  private handlers: Record<
    string,
    (
      data: BotOutputData,
    ) => BotMenu<Input | Option> | Promise<BotMenu<Input | Option>>
  >;

  constructor(private readonly actionService: ActionService) {
    this.handlers = {
      action: this.handleAction.bind(this),
    };
  }

  handler(
    data: BotOutputData,
  ): BotMenu<Input | Option> | Promise<BotMenu<Input | Option>> {
    const typeHandler = this.handlers[data.menu.type];
    if (!typeHandler) return null;

    return typeHandler(data);
  }

  private handleAction(data: BotOutputData) {
    return this.actionService.handleAction(data);
  }
}
