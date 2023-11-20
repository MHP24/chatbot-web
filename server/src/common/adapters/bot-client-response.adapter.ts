import { Injectable } from '@nestjs/common';
import {
  BotClientResponseAdapterT,
  BotResponseAdapter,
  MessageTypeForClient,
} from './types';
import { SystemMessage } from '../types';

@Injectable()
export class BotClientResponseAdapter implements BotClientResponseAdapterT {
  validTypes = ['input', 'option'];

  adapt(arg: SystemMessage): BotResponseAdapter {
    const { type, data, body = [], header } = arg;
    const isValidType = this.validTypes.includes(type);

    const adapter = {
      type: (isValidType ? type : 'input') as MessageTypeForClient,
      header,
      body,
      data: {},
    };

    if (!isValidType && data?.option) {
      adapter.data = { ...adapter.data, option: data.option };
      adapter.type = 'option';
    }

    if (type === 'option') {
      adapter.data = { ...adapter.data, option: data.option };
    }

    if (type === 'input') {
      adapter.data = { ...adapter.data, input: { detail: data.input.input } };
    }

    return adapter;
  }
}
