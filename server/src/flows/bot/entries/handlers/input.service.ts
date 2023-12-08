import { Injectable } from '@nestjs/common';
import { FlowEntry, BotContext, BotMenu, Menu, Input } from '../../../types';
import { mainMenu } from '../../menus/main';
import { RedisService } from 'src/providers/cache/redis.service';
import { deleteVariable } from 'src/flows/helpers';

@Injectable()
export class InputService {
  constructor(private readonly redisService: RedisService) {}

  async handleInput(
    contextData: FlowEntry<BotContext>,
  ): Promise<BotMenu<Menu>> {
    const { message } = contextData.message;
    const { currentMenu } = contextData.context as {
      currentMenu: BotMenu<Input>;
    };

    const input = currentMenu.data[currentMenu.type];
    const regExp = new RegExp(input.regex);

    // * Wrong answers send the same question again with an error message
    if (input.regex && !message.match(regExp)) {
      return {
        ...currentMenu,
        header: currentMenu.data.input.errorMessage,
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
    return input.onValid.redirect
      .split(':')
      .reduce((output: BotMenu<Menu>, key: string) => {
        return output[key];
      }, mainMenu);
  }
}
