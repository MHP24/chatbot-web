import { Injectable } from '@nestjs/common';
import { Chat } from 'src/common';
import { getVariable } from 'src/flows/helpers';
import {
  Action,
  BotMenu,
  BotDataResponse,
  Input,
  Option,
  BotContext,
} from 'src/flows/types';
import { RedisService } from 'src/providers/cache/redis.service';

@Injectable()
export class ActionService {
  actions: Record<
    string,
    (
      data: BotDataResponse,
      context: BotContext,
    ) => BotMenu<Input | Option> | Promise<BotMenu<Input | Option>>
  >;

  constructor(private readonly redisService: RedisService) {
    // * All actions available
    this.actions = {
      contact: this.contact.bind(this),
    };
  }

  async handleAction(data: BotDataResponse): Promise<BotMenu<Input | Option>> {
    const { menu } = data as { menu: BotMenu<Action> };
    const { name } = menu.data.action;

    const action = this.actions[name];
    if (!action) {
      throw new Error(`Action: ${name} not supported`);
    }

    const {
      context: { bot },
    } = await this.redisService.get<Chat>(`chat:${data.chatId}`);

    return await action(data, bot);
  }

  // * Actions required for specific use cases...
  async contact(
    data: BotDataResponse,
    context: BotContext,
  ): Promise<BotMenu<Input | Option>> {
    const { variables } = context;
    const email = getVariable('mail-contact', variables);
    const subject = getVariable('subject-contact', variables);
    // TODO: add contact fn
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
            redirect: 'home:exti',
          },
        ],
      },
    };
  }
}
