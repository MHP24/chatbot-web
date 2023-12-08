import { BotMenu, Menu } from '../../types';

export const contact: Record<string, BotMenu<Menu>> = {
  start: {
    type: 'input',
    header: 'Por favor, a continuación ingresa tu email:',
    body: [],
    data: {
      input: {
        reference: 'mail-contact',
        regex: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
        errorMessage: 'Por favor, ingresa un email válido.',
        onValid: {
          redirect: 'contact:subject',
        },
      },
    },
  },

  subject: {
    type: 'input',
    header: '¿Que información te gustaría recibir?',
    body: [],
    data: {
      input: {
        reference: 'subject-contact',
        regex: null,
        errorMessage: 'Por favor, ingresa un asunto válido',
        onValid: {
          redirect: 'contact:send',
        },
      },
    },
  },

  send: {
    type: 'action',
    header:
      '¡Muchas gracias por tu tiempo!\n Tus datos son: Correo electrónico: $0 \nAsunto: $1',
    body: [
      {
        type: 'text',
        text: 'Miguel se pondrá en contacto a la brevedad posible',
      },
      { type: 'text', text: '¿Necesitas algo más?' },
    ],
    data: {
      action: {
        name: 'contact',
        options: [],
      },
    },
  },
};
