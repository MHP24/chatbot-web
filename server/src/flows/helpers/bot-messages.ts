import { SystemMessage } from 'src/common/types';
import { MENU } from '../bot/menus/main';
import { getOption } from '.';

export const handleOptionMessage = (message: string): SystemMessage => {
  const option = getOption(MENU, message);
  return option;
};

// export const handleInputMessage = (): SystemMessage => {
//   //
// };
