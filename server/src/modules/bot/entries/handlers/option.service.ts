import { Injectable } from '@nestjs/common';
import Fuse from 'fuse.js';
// * Menus
import { mainMenu } from '../../menus/main';
// * Services
import { RedisService } from '../../../cache/redis.service';
// * Types
import {
  FlowEntry,
  BotContext,
  BotEntryResponse,
  BotMenu,
  Option,
} from '../../types';
// * Helpers
import { deleteVariable } from '../../helpers';

@Injectable()
export class OptionService {
  variations: Record<
    string,
    (data: FlowEntry<BotContext>) => Promise<BotEntryResponse>
  >;

  constructor(private readonly redisService: RedisService) {
    this.variations = {
      dynamic: this.handleDynamicOption.bind(this),
    };
  }

  // * Main handler for options
  async handleOption(data: FlowEntry<BotContext>): Promise<BotEntryResponse> {
    const { context } = data;
    const currentMenu = context.currentMenu as BotMenu<Option>;

    const { variant = undefined } = currentMenu;
    const optionVariant = this.variations[variant];

    if (!optionVariant) return this.handleStaticOption(data);

    return await optionVariant(data);
  }

  // * Without variant
  handleStaticOption(data: FlowEntry<BotContext>): BotEntryResponse {
    const { message, context } = data;
    const currentMenu = context.currentMenu;

    const selectionByOption = this.getMenuBySelection(
      context.currentMenu as BotMenu<Option>,
      message.message,
    );

    if (selectionByOption.menu) return selectionByOption;

    const selectionBySearch = this.getMenuBySearch(
      data.context.currentMenu as BotMenu<Option>,
      message.message,
    );

    if (selectionBySearch) {
      const { menu } = this.getMenuBySelection(
        context.currentMenu as BotMenu<Option>,
        selectionBySearch.redirect,
      );
      return {
        menu,
      };
    }

    return {
      menu: {
        ...currentMenu,
        header:
          'No he podido entender tu respuesta, selecciona alguna de las opciones:',
      },
    };
  }

  // * Variations...
  async handleDynamicOption(
    data: FlowEntry<BotContext>,
  ): Promise<BotEntryResponse> {
    const {
      context,
      message: { message },
    } = data;
    const menu = context.currentMenu as BotMenu<Option>;

    const selection = menu.data.option.find(
      ({ redirect }) => redirect === message,
    );

    if (!selection) {
      return {
        menu: {
          ...menu,
          header: 'Selecciona una opción válida',
        },
      };
    }

    const {
      variable: { destination, ...rest },
    } = selection;

    // * Add the new variable obtained from selection to the context
    await this.redisService.update<BotContext>(
      `chat:${data.chatId}`,
      'context.bot',
      {
        ...data.context,
        variables: [
          // * Replace old variable with the same reference
          ...deleteVariable(rest.reference, data.context.variables),
          rest,
        ],
      },
    );

    return this.getMenuBySelection(
      data.context.currentMenu as BotMenu<Option>,
      destination,
    );
  }

  // * Helpers to get data from menus
  getMenuBySelection(
    contextMenu: BotMenu<Option>,
    option: string,
  ): BotEntryResponse {
    const menu = option.split(':').reduce((output, key) => {
      return output[key];
    }, mainMenu);

    const equivalentMessage = contextMenu.data.option.find(
      ({ redirect }) => redirect === option,
    )?.label;

    return {
      menu,
      equivalentMessage,
    };
  }

  getMenuBySearch(
    menu: BotMenu<Option>,
    term: string,
  ): {
    label: string;
    redirect: string;
  } | null {
    const { data } = menu;

    const fuse = new Fuse(data.option, {
      keys: ['label'],
      threshold: 0.5,
    });

    const result = fuse.search(term);
    if (result.length > 0) return result[0].item;

    return null;
  }
}
