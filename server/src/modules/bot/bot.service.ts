import { Injectable } from '@nestjs/common';
import { envs } from '../../common/config';
// * Menus
import { mainMenu } from './menus/main';
// * Services
import { EntriesService } from './entries/entries.service';
import { OutputsService } from './outputs/outputs.service';
import { RedisService } from '../cache/redis.service';
// * Types
import { FlowEntry, FlowResponse } from '../flows/types/flows';
import { FlowI } from '../flows/interfaces';
import { BotContext, BotMenu, Input, Option } from './types';
import { Chat } from '../chat/types/chat';
import { EntryClientMessage } from '../chat/types/message';
// * Helpers
import { getMenuBySelection, buildContext } from './helpers';

@Injectable()
export class BotService implements FlowI<BotContext> {
  constructor(
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
        origin: envs.defaultFlowKeyType,
        message: envs.defaultFlowKey,
      };

      //  * Extract the first selection to start the flow
      const selection = getMenuBySelection(
        mainMenu,
        defaultMessage.message,
      ) as BotMenu<Input | Option>;

      // * Eval if the selection must to be handled by handleOutputs
      const { type, response, timestamp } = await this.outputsService.handler({
        chatId,
        menu: selection,
      });

      await this.redisService.update(
        `chat:${chatId}`,
        'context.bot',
        buildContext(
          context,
          defaultMessage,
          response,
          clientTimestamp,
          timestamp,
        ),
      );

      return {
        type,
        response,
        timestamp,
      };
    }

    // * On next messages already having a context...

    // * Handling from context
    const { menu, equivalentMessage } = await this.entriesService.handler(data);

    // * Check if have to do something, (not in option, input)
    const { type, response, timestamp } = await this.outputsService.handler({
      chatId,
      menu,
    });

    const nextMenu = response as BotMenu<Input | Option>;

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
      buildContext(
        bot,
        { ...message, equivalentMessage },
        nextMenu,
        clientTimestamp,
        timestamp,
      ),
    );

    return {
      type,
      response: nextMenu,
      timestamp,
    };
  }
}
