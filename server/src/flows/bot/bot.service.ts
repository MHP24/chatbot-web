import { Injectable } from '@nestjs/common';
import { Message } from '../../common/types';

@Injectable()
export class BotService {
  handleFlow({ sessionId, message, context }: Message) {
    console.log({ sessionId, message, context });
  }
}
