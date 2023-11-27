import {
  BotContext,
  BotMenu,
  BotDataResponse,
  FlowEntry,
  Input,
  Menu,
  Option,
} from 'src/flows/types';

export interface BotEntryHandler {
  handler: (
    ctx: FlowEntry<BotContext>,
  ) => BotMenu<Menu> | Promise<BotMenu<Menu>>;
}

export interface BotOutputHandler {
  handler: (
    data: BotDataResponse,
  ) => BotMenu<Input | Option> | Promise<BotMenu<Input | Option>>;
}
