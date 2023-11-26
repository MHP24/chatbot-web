import {
  BotContext,
  BotMenu,
  BotOutputData,
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
    data: BotOutputData,
  ) => BotMenu<Input | Option> | Promise<BotMenu<Input | Option>>;
}
