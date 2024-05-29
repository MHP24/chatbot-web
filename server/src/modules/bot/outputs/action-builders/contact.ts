import { BotMenu, Input, Option } from '../../types';

export const contactActionResponse = (
  email: string,
  subject: string,
): BotMenu<Input | Option> => {
  return {
    type: 'option',
    header: `Perfecto, Miguel se comunicará contigo al correo ${email} con el asunto de: ${subject}`,
    body: [
      {
        type: 'text',
        text: '¿Necesitas algo más?',
      },
    ],
    data: {
      option: [
        {
          label: 'Si',
          redirect: 'home:start',
        },
        {
          label: 'No',
          redirect: 'home:exit',
        },
      ],
    },
  };
};
