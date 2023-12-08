import { Injectable } from '@nestjs/common';
import { FlowEntry, BotContext, BotMenu, Menu, Option } from 'src/flows/types';
import { FullBotMenu, mainMenu } from '../../menus/main';
import Fuse from 'fuse.js';
import { RedisService } from 'src/providers/cache/redis.service';
import { deleteVariable } from 'src/flows/helpers';

@Injectable()
export class OptionService {
  variations: Record<
    string,
    (data: FlowEntry<BotContext>) => Promise<BotMenu<Menu>>
  >;

  constructor(private readonly redisService: RedisService) {
    this.variations = {
      dynamic: this.handleDynamicOption.bind(this),
    };
  }

  // * Main handler for options
  async handleOption(data: FlowEntry<BotContext>): Promise<BotMenu<Menu>> {
    const { context } = data;
    const currentMenu = context.currentMenu as BotMenu<Option>;

    const { variant = undefined } = currentMenu;
    const optionVariant = this.variations[variant];

    if (!optionVariant) return this.handleStaticOption(data);

    return await optionVariant(data);
  }

  // * Without variant
  handleStaticOption(data: FlowEntry<BotContext>): BotMenu<Menu> {
    const { message, context } = data;
    const currentMenu = context.currentMenu as BotMenu<Option>;

    const selectionByOption = this.getMenuBySelection(
      mainMenu,
      message.message,
    );

    if (selectionByOption) return selectionByOption;

    const selectionBySearch = this.getMenuBySearch(
      data.context.currentMenu as BotMenu<Option>,
      message.message,
    );

    if (selectionBySearch) {
      return this.getMenuBySelection(mainMenu, selectionBySearch.redirect);
    }

    return {
      ...currentMenu,
      header:
        'No he podido entender tu respuesta, selecciona alguna de las opciones:',
    };
  }

  // * Variations...
  async handleDynamicOption(
    data: FlowEntry<BotContext>,
  ): Promise<BotMenu<Menu>> {
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
        ...menu,
        header: 'Selecciona una opción válida',
      };
    }

    const {
      variable: { destination, ...rest },
    } = selection;

    // TODO: move this to helper
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

    return this.getMenuBySelection(mainMenu, destination);
  }

  // * Helpers to get data from menus
  getMenuBySelection(
    menu: FullBotMenu | BotMenu<Menu>,
    option: string,
  ): BotMenu<Menu> {
    return option.split(':').reduce((output, key) => {
      return output[key];
    }, menu);
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
