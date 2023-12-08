import { Injectable } from '@nestjs/common';
import {
  BotMenu,
  Input,
  Option,
  BotDataResponse,
  FlowResponse,
  FlowMessageResponse,
  FlowCloseResponse,
} from 'src/flows/types';
import { ActionService } from './handlers';
import { BotOutputHandler } from '../interfaces';

@Injectable()
export class OutputsService implements BotOutputHandler {
  private handlers: Record<
    string,
    (data: BotDataResponse) => Promise<FlowResponse>
  >;

  constructor(private readonly actionService: ActionService) {
    this.handlers = {
      action: this.handleAction.bind(this),
      close: this.handleClose.bind(this),
    };
  }

  async handler(data: BotDataResponse): Promise<FlowResponse> {
    const typeHandler = this.handlers[data.menu.type];

    if (!typeHandler) {
      return {
        type: 'message',
        response: data.menu as BotMenu<Input | Option>,
        timestamp: +new Date(),
      };
    }
    return await typeHandler(data);
  }

  private async handleAction(
    data: BotDataResponse,
  ): Promise<FlowMessageResponse> {
    const action = await this.actionService.handleAction(data);
    return {
      type: 'message',
      response: action,
      timestamp: +new Date(),
    };
  }

  private handleClose(data: BotDataResponse): FlowCloseResponse {
    // * Simple bye message from close menu handled as option
    const closeMenu: BotMenu<Option> = {
      type: 'option',
      header: data.menu.header,
      body: data.menu.body,
      data: {
        option: [],
      },
    };

    return {
      type: 'close',
      response: closeMenu,
      timestamp: +new Date(),
    };
  }
}
