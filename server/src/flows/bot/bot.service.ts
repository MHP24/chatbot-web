import { Injectable } from '@nestjs/common';
import { BotContext, BotMenu, FlowEntry, Input, Option } from '../types';
import { EntryClientMessage } from 'src/common';
import { ConfigService } from '@nestjs/config';
import { getMenuBySelection } from '../helpers';
import { mainMenu } from './menus/main';
import { RedisService } from 'src/providers/cache/redis.service';

@Injectable()
export class BotService {
  // TODO: Inject handleEntry, handleOutput
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  handleFlow(data: FlowEntry<BotContext>): any {
    const { chatId, message, context } = data;
    const clientTimestamp = Number(new Date());

    if (!context) {
      const defaultMessage: EntryClientMessage = {
        origin: this.configService.get('DEFAULT_FLOW_KEY_TYPE'),
        message: this.configService.get('DEFAULT_FLOW_KEY'),
      };

      //  * Extract the first selection to start the flow
      const selection = getMenuBySelection(
        mainMenu,
        defaultMessage.message,
      ) as BotMenu<Input | Option>;

      /*
       * Eval if the selection must to be handled by handleOutputs
       */
      // TODO: Eval and adapt and use this instead selection and use this to return

      const botContext: BotContext = {
        currentMenu: selection,
        variables: [],
        messages: [],
        nodes: [
          {
            reference: defaultMessage.message,
            timestamp: clientTimestamp,
          },
        ],
        history: [
          {
            side: 'client',
            content: defaultMessage,
            timestamp: clientTimestamp,
          },
          {
            side: 'bot',
            content: selection,
            timestamp: Number(new Date()),
          },
        ],
      };

      this.redisService.update(`chat:${chatId}`, 'context.bot', botContext);
    }
    console.log({ chatId, message, context });
  }
}
