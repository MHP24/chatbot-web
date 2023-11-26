import { BotMenu, Menu } from './bot-messages';

export type BotOutputData = {
  chatId: string;
  menu: BotMenu<Menu>;
};
