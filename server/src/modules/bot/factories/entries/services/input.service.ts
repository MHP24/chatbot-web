import { Injectable } from '@nestjs/common';
// * Menus
import { mainMenu } from '../../../menus/main';
// * Services
import { RedisService } from '../../../../cache/redis.service';
// * Types
import {
  BotContext,
  BotEntryResponse,
  BotMenu,
  Input,
  Menu,
} from '../../../types';
import { FlowEntry } from '../../../../flows/types';
import { BotEntryHandler } from '../../../../bot/interfaces';
// * Helpers
import { deleteVariable } from '../../../helpers';

@Injectable()
export class InputService implements BotEntryHandler {
  constructor(private readonly redisService: RedisService) {}

  async handle(contextData: FlowEntry<BotContext>): Promise<BotEntryResponse> {
    const { message } = contextData.message;
    const { currentMenu } = contextData.context as {
      currentMenu: BotMenu<Input>;
    };

    const input = currentMenu.data[currentMenu.type];
    const regExp = new RegExp(input.regex);

    // * Wrong answers send the same question again with an error message
    if (input.regex && !message.match(regExp)) {
      return {
        menu: {
          ...currentMenu,
          header: currentMenu.data.input.errorMessage,
        },
      };
    }

    // * Add the new variable obtained from input to the context
    await this.redisService.update<BotContext>(
      `chat:${contextData.chatId}`,
      'context.bot',
      {
        ...contextData.context,
        variables: [
          // * Replace old variable with the same reference
          ...deleteVariable(input.reference, contextData.context.variables),
          {
            reference: input.reference,
            value: message,
          },
        ],
      },
    );

    // * Sends the next menu to handle using the output handler
    return {
      menu: input.onValid.redirect
        .split(':')
        .reduce((output: BotMenu<Menu>, key: string) => {
          return output[key];
        }, mainMenu),
    };
  }
}
