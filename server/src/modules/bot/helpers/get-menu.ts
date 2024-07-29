import Fuse from 'fuse.js';
import { FullBotMenu } from '../menus/main';
import { BotMenu, Menu, Option } from '../types';

export const getMenuBySelection = (
  menu: FullBotMenu,
  option: string,
): BotMenu<Menu> => {
  return option.split(':').reduce((output, key) => {
    return output[key];
  }, menu);
};

export const getMenuBySearch = (
  options: Option[],
  term: string,
): Option | null => {
  const fuse = new Fuse(options, {
    keys: ['label'],
    threshold: 0.5,
  });

  const result = fuse.search(term);
  if (result.length > 0) return result[0].item;

  return null;
};
