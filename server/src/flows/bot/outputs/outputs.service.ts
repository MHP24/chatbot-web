import { Injectable } from '@nestjs/common';
import { BotMenu, Input, Option, BotDataResponse } from 'src/flows/types';
import { ActionService } from './handlers';
import { BotOutputHandler } from '../interfaces';

@Injectable()
export class OutputsService implements BotOutputHandler {
  private handlers: Record<
    string,
    (data: BotDataResponse) => Promise<BotMenu<Input | Option>>
  >;

  constructor(private readonly actionService: ActionService) {
    this.handlers = {
      action: this.handleAction.bind(this),
    };
  }

  async handler(
    data: BotDataResponse,
  ): Promise<BotMenu<Input | Option>> | null {
    const typeHandler = this.handlers[data.menu.type];
    if (!typeHandler) return null;

    return await typeHandler(data);
  }

  private handleAction(data: BotDataResponse) {
    return this.actionService.handleAction(data);
  }
}
