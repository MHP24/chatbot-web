import { BotMessage } from '../../../flows/types';
export const contact: Record<string, BotMessage> = {
  start: {
    type: 'input',
    data: {
      input: {
        input: 'Por favor, a continuación ingresa tu email:',
        regex: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
        error_message: 'Por favor, ingresa un email válido.',
        on_input_valid: {
          redirect: 'contact:subject',
        },
      },
    },
  },

  subject: {
    type: 'input',
    data: {
      input: {
        input: '¿Que información te gustaría recibir?',
        regex: null,
        error_message: 'Por favor, ingresa un asunto válido',
        on_input_valid: {
          redirect: 'contact:send',
        },
      },
    },
  },

  send: {
    type: 'action',
    header: '¡Muchas gracias por tu tiempo!',
    body: [
      {
        type: 'text',
        text: 'Miguel se pondrá en contacto a la brevedad posible',
      },
      { type: 'text', text: '¡Adios!' },
    ],
    action: 'contact',
    parameters_required: 2,
  },
};
