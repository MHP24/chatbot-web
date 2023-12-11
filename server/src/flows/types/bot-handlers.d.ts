import { BotMenu, Menu } from './bot-messages';

export type BotEntryResponse = {
  menu: BotMenu<Menu>;
  equivalentMessage?: string;
};

export type BotDataResponse = {
  chatId: string;
  menu: BotMenu<Menu>;
};
