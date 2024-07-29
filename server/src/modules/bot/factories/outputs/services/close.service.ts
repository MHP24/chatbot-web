import { Injectable } from '@nestjs/common';
import {
  BotDataResponse,
  BotMenu,
  BotMessageType,
  Option,
} from '../../../types';
import { FlowEnumResponse, FlowResponse } from '../../../../flows/types';
import { BotOutputHandler } from '../../../interfaces';

@Injectable()
export class CloseService implements BotOutputHandler {
  handle(data: BotDataResponse): FlowResponse {
    // * Simple bye message from close menu handled as option
    const closeMenu: BotMenu<Option> = {
      type: BotMessageType.option,
      header: data.menu.header,
      body: data.menu.body,
      data: {
        option: [],
      },
    };

    return {
      type: FlowEnumResponse.close,
      response: closeMenu,
      timestamp: +new Date(),
    };
  }
}
