import { Injectable } from '@nestjs/common';
import { ActionService } from './services/action.service';
// * Types
import { BotMessageType } from '../../types';
import { BotOutputHandler, OutputsCreator } from '../../interfaces';
import { CloseService } from './services/close.service';

@Injectable()
export class OutputsFactory implements OutputsCreator {
  constructor(
    private readonly actionService: ActionService,
    private readonly closeService: CloseService,
  ) {}

  handleOutputsCreation(botMessageType: BotMessageType): BotOutputHandler {
    const outputsHandlers = {
      [BotMessageType.action]: this.actionService,
      [BotMessageType.close]: this.closeService,
    };

    return outputsHandlers[botMessageType];

    // return {
    //   type: 'message',
    //   response: data.menu as BotMenu<Input | Option>,
    //   timestamp: +new Date(),
    // };
  }
}
