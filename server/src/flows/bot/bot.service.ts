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
import { Chat, ChatSide, EntryClientMessage } from 'src/common';
import { getMenuBySelection } from '../helpers';
import { mainMenu } from './menus/main';
import { RedisService } from 'src/providers/cache/redis.service';
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
    const { chatId, message, context } = data;
    const { origin, message: clientMessage } = message ?? {};
    const clientTimestamp = Number(new Date());

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

      /*
       * Eval if the selection must to be handled by handleOutputs
       */
      // TODO: Eval and adapt and use this instead selection and use this to return

      const botTimestamp = Number(new Date());

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
            timestamp: botTimestamp,
          },
        ],
      };

      await this.redisService.update(
        `chat:${chatId}`,
        'context.bot',
        botContext,
      );

      return {
        type: 'bot-message',
        response: selection,
        timestamp: botTimestamp,
      };
    }

    // * On next messages already having a context
    const inputHandling = await this.entriesService.handler(data);

    const outputHandling = await this.outputsService.handler({
      chatId,
      menu: inputHandling,
    });

    const nextMenu = (outputHandling ?? inputHandling) as BotMenu<
      Input | Option
    >;

    /*
     * latest content is required in case one of the handlers changed the context
     * adding variables, handling menu, messages, etc
     */
    const {
      context: { bot },
    } = await this.redisService.get<Chat>(`chat:${chatId}`);

    /*
     * Update using the latest content
     */
    const nextContext = {
      ...bot,
      currentMenu: nextMenu,
      nodes: [...bot.nodes],
      history: [
        ...bot.history,
        {
          side: 'client' as ChatSide,
          content: {
            origin,
            message: clientMessage,
          },
          timestamp: clientTimestamp,
        },
        {
          side: 'bot' as ChatSide,
          content: nextMenu,
          timestamp: Number(new Date()),
        },
      ],
      messages: [...bot.messages],
    };

    origin === 'option' &&
      nextContext.nodes.push({
        reference: clientMessage,
        timestamp: clientTimestamp,
      });

    origin === 'input' &&
      nextContext.messages.push({
        content: clientMessage,
        timestamp: clientTimestamp,
      });

    await this.redisService.update<BotContext>(
      `chat:${chatId}`,
      'context.bot',
      nextContext,
    );

    return {
      type: 'bot-message',
      response: nextMenu,
      timestamp: +new Date(),
    };
  }
}
