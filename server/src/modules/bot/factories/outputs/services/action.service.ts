import { Injectable } from '@nestjs/common';
import { RedisService } from '../../../../cache/redis.service';
import { contactActionResponse } from '../../actions/contact';
// * Types
import {
  BotDataResponse,
  BotContext,
  BotMenu,
  Input,
  Option,
  Action,
} from '../../../types';
import { FlowEnumResponse, FlowResponse } from '../../../../flows/types';
import { BotOutputHandler } from '../../../../bot/interfaces';
import { Chat } from '../../../../chat/types/chat';
// * Helpers
import { getVariable } from '../../../helpers';

@Injectable()
export class ActionService implements BotOutputHandler {
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

  async handle(data: BotDataResponse): Promise<FlowResponse> {
    const { menu } = data as { menu: BotMenu<Action> };
    const { name } = menu.data.action;

    const action = this.actions[name];
    if (!action) {
      throw new Error(`Action: ${name} not supported`);
    }

    const {
      context: { bot },
    } = await this.redisService.get<Chat>(`chat:${data.chatId}`);

    return {
      type: FlowEnumResponse.message,
      response: await action(data, bot),
      timestamp: +new Date(),
    };
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
