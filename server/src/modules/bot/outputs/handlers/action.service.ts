import { Injectable } from '@nestjs/common';
import { RedisService } from '../../../cache/redis.service';
import { contactActionResponse } from '../action-builders';
// * Types
import {
  BotDataResponse,
  BotContext,
  BotMenu,
  Input,
  Option,
  Action,
} from '../../types';
// * Helpers
import { getVariable } from '../../helpers';
import { Chat } from '../../../chat/types/chat';

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
    const email = getVariable<string>('mail-contact', variables);
    const subject = getVariable<string>('subject-contact', variables);

    // TODO: add contact fn => mailer
    return contactActionResponse(email, subject);
  }
}
