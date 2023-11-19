import { BotContext, SystemMessage } from 'src/common/types';
import { MENU } from '../bot/menus/main';
import { getOption } from '.';

export const handleOptionMessage = (
  message: string,
  context: BotContext,
): SystemMessage => {
  console.log({ context });

  const option = getOption(MENU, message);
  if (option) return option;

  // const words = message.trim().split(' ');

  // search
};

// export const handleInputMessage = (): SystemMessage => {
//   //
// };
