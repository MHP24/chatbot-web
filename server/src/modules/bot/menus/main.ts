import { home } from './home';
import { business } from './business';
import { contact } from './contact';
import { BotMenu, Menu } from '../types';

export type FullBotMenu = {
  home: Record<string, BotMenu<Menu>>;
  business: Record<string, BotMenu<Menu>>;
  contact: Record<string, BotMenu<Menu>>;
};

export const mainMenu: FullBotMenu = {
  home,
  business,
  contact,
};
