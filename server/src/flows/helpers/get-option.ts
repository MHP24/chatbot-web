import { SystemMessage } from 'src/common/types';
import { BotMessage } from '../types';
import { Option } from '../types';
import Fuse from 'fuse.js';

type Menu = {
  home: Record<string, BotMessage>;
  business: Record<string, BotMessage>;
  contact: Record<string, BotMessage>;
};

export const getOptionBySelection = (
  menu: Menu,
  option: string,
): SystemMessage => {
  return option.split(':').reduce((output, key) => {
    return output[key];
  }, menu);
};

export const getOptionBySearch = (
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
