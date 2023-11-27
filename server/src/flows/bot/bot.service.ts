import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  BotContext,
  BotMenu,
  FlowEntry,
  FlowResponse,
  Input,
  Option,
} from '../types';
import { Chat, EntryClientMessage } from '../../common';
import { buildContext, getMenuBySelection } from '../helpers';
import { mainMenu } from './menus/main';
import { RedisService } from '../../providers/cache/redis.service';
import { EntriesService } from './entries/entries.service';
import { OutputsService } from './outputs/outputs.service';

@Injectable()
export class BotService {
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly entriesService: EntriesService,
    private readonly outputsService: OutputsService,
  ) {}

  async handleFlow(data: FlowEntry<BotContext>): Promise<FlowResponse> {
    const clientTimestamp = +new Date();
    const { chatId, message, context } = data;

    // * On new message starting this flow
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

      // * Eval if the selection must to be handled by handleOutputs
      const outputHandling = await this.outputsService.handler({
        chatId,
        menu: selection,
      });

      await this.redisService.update(
        `chat:${chatId}`,
        'context.bot',
        buildContext(
          context,
          defaultMessage,
          outputHandling ?? selection,
          clientTimestamp,
          +new Date(),
        ),
      );

      return {
        type: 'bot-message',
        response: selection,
        timestamp: +new Date(),
      };
    }

    // * On next messages already having a context...

    // * Handling from context
    const inputHandling = await this.entriesService.handler(data);

    // * Check if have to do something, (not in option, input)
    const outputHandling = await this.outputsService.handler({
      chatId,
      menu: inputHandling,
    });

    const nextMenu = (outputHandling ?? inputHandling) as BotMenu<
      Input | Option
    >;

    /*
     * latest context is required in case one of the handlers changed the context
     * adding variables, handling menu, messages, etc
     */
    const {
      context: { bot },
    } = await this.redisService.get<Chat>(`chat:${chatId}`);

    // * Update using the latest context
    await this.redisService.update<BotContext>(
      `chat:${chatId}`,
      'context.bot',
      buildContext(bot, message, nextMenu, clientTimestamp, +new Date()),
    );

    return {
      type: 'bot-message',
      response: nextMenu,
      timestamp: +new Date(),
    };
  }
}
