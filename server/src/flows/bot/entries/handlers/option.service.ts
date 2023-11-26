import { Injectable } from '@nestjs/common';
import { FlowEntry, BotContext, BotMenu, Menu, Option } from 'src/flows/types';
import { FullBotMenu, mainMenu } from '../../menus/main';
import Fuse from 'fuse.js';

@Injectable()
export class OptionService {
  handleOption(data: FlowEntry<BotContext>): BotMenu<Menu> {
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
      return this.getMenuBySelection(currentMenu, selectionBySearch.redirect);
    }

    return {
      ...currentMenu,
      header:
        'No he podido entender tu respuesta, selecciona alguna de las opciones:',
    };
  }

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
