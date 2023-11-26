import { Injectable } from '@nestjs/common';
import { BotOutputData } from 'src/flows/types';

@Injectable()
export class ActionService {
  handleAction(data: BotOutputData) {
    console.log({ data });
  }
}
