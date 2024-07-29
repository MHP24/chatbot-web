import { Injectable } from '@nestjs/common';
import {
  BotContext,
  BotDataResponse,
  BotMenu,
  BotMessageType,
  Input,
  Option,
} from '../../../types';
import { ActionI } from '../../../interfaces';
import { getVariable } from '../../../helpers';

@Injectable()
export class ContactAction implements ActionI {
  executeAction(
    data: BotDataResponse,
    context: BotContext,
  ): BotMenu<Input | Option> {
    const { variables } = context;
    const email = getVariable<string>('mail-contact', variables);
    const subject = getVariable<string>('subject-contact', variables);

    // TODO: Add contact fn

    return {
      type: BotMessageType.option,
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
  }
}
