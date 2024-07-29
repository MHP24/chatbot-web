import { Injectable } from '@nestjs/common';
import { RedisService } from '../../../../cache/redis.service';
import { ActionsFactory } from '../../actions';
// * Types
import { BotDataResponse, BotMenu, Action } from '../../../types';
import { FlowEnumResponse, FlowResponse } from '../../../../flows/types';
import { ActionI, BotOutputHandler } from '../../../interfaces';
import { Chat } from '../../../../chat/types/chat';

@Injectable()
export class ActionService implements BotOutputHandler {
  constructor(
    private readonly redisService: RedisService,
    private readonly actionsFactory: ActionsFactory,
  ) {}

  async handle(data: BotDataResponse): Promise<FlowResponse> {
    const { menu } = data as { menu: BotMenu<Action> };
    const { name } = menu.data.action;

    const action: ActionI = this.actionsFactory.handleActionsCreation(name);
    const {
      context: { bot },
    } = await this.redisService.get<Chat>(`chat:${data.chatId}`);

    return {
      type: FlowEnumResponse.message,
      response: await action.executeAction(data, bot),
      timestamp: +new Date(),
    };
  }
}
