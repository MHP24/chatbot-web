import { Injectable } from '@nestjs/common';
import { Message } from '../../common/types';
import { getOption } from '../helpers';
import { MENU } from './menus/main';

@Injectable()
export class BotService {
  handleFlow({ message }: Message) {
    const { data, type } = message;
    if (type === 'option') {
      const option = getOption(MENU, data);
      return option;
    }
    // console.log({ sessionId, message, context });
  }
}
