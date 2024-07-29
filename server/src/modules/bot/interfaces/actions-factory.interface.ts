import { BotContext, BotDataResponse, BotMenu, Input, Option } from '../types';

export interface ActionI {
  executeAction(
    data: BotDataResponse,
    context: BotContext,
  ): BotMenu<Input | Option> | Promise<BotMenu<Input | Option>>;
}

export interface ActionsCreator {
  handleActionsCreation(action: string): ActionI;
}
