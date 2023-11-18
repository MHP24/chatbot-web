import { Injectable } from '@nestjs/common';
import { ClientMessage, SystemMessage } from '../../common/types';
import { handleOptionMessage } from '../helpers';

@Injectable()
export class BotService {
  constructor() {}

  handleFlow({ message }: ClientMessage) {
    const supportedMessages: Record<
      string,
      (message: string) => SystemMessage
    > = {
      option: handleOptionMessage,
    };

    const { data, type } = message;
    const messageHandling = supportedMessages[type];
    return messageHandling ? messageHandling(data) : null;
  }
}
