import { SystemMessage } from 'src/common/types';
import { BotMessage } from '../types';

type Menu = {
  home: Record<string, BotMessage>;
  business: Record<string, BotMessage>;
  contact: Record<string, BotMessage>;
};

export const getOption = (menu: Menu, option: string): SystemMessage => {
  return option.split(':').reduce((output, key) => {
    return output[key];
  }, menu);
};
