import { BotMenu, Menu } from '../../types';

export const dynamic: Record<string, BotMenu<Menu>> = {
  products: {
    type: 'action',
    header: '',
    body: [],
    data: {
      action: {
        name: 'products',
        options: [],
      },
    },
  },
  productcheck: {
    type: 'option',
    header: 'Product check detail',
    body: [],
    data: {
      option: [
        {
          label: 'Inicio',
          redirect: 'home:start',
        },
        {
          label: 'contactar con miguel',
          redirect: 'contact:start',
        },
      ],
    },
  },
};
