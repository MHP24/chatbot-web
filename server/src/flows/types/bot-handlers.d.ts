import { BotMenu, Menu } from './bot-messages';

export type BotDataResponse = {
  chatId: string;
  menu: BotMenu<Menu>;
};
