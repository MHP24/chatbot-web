import { BotMessage } from '../../../flows/types';

export const business: Record<string, BotMessage> = {
  portfolio: {
    type: 'option',
    header: '¡Automatiza tu negocio!',
    body: [],
    data: {
      option: [
        {
          label: 'Dar el siguiente paso',
          redirect: 'contact:start',
        },
        {
          label: 'Servicios',
          redirect: 'business:services',
        },
        {
          label: 'Volver al inicio',
          redirect: 'home:start',
        },
        {
          label: 'Salir',
          redirect: 'home:exit',
        },
      ],
    },
  },

  services: {
    type: 'option',
    header: 'Servicios dentro de mi área de expertís',
    body: [],
    data: {
      option: [
        {
          label: 'Solicitar servicio',
          redirect: 'contact:start',
        },
        {
          label: 'Automatiza tu negocio',
          redirect: 'business:portfolio',
        },
        {
          label: 'Volver al inicio',
          redirect: 'home:start',
        },
        {
          label: 'Salir',
          redirect: 'home:exit',
        },
      ],
    },
  },
};
