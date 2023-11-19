import { BotContext, SystemMessage } from 'src/common/types';
import { MENU } from '../bot/menus/main';
import { getOptionBySelection, getOptionBySearch } from '.';

export const handleOptionMessage = (
  message: string,
  context: BotContext,
): SystemMessage => {
  const option = getOptionBySelection(MENU, message);
  if (option) return option;

  // TODO: search similar
  const { data, type } = context.data;
  const search = getOptionBySearch(data[type], message);
  if (search) {
    return getOptionBySelection(MENU, search.redirect);
  }

  return {
    type: 'option',
    header: 'No ntendi',
    body: [{ type: 'text', text: 'Selecciona una opción válida' }],
    data: {
      option: data[type],
    },
  } as SystemMessage;
};

// export const handleInputMessage = (): SystemMessage => {
//   //
// };
