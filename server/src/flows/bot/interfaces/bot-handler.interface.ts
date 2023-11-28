import {
  BotContext,
  BotMenu,
  BotDataResponse,
  FlowEntry,
  Menu,
  FlowResponse,
} from 'src/flows/types';

export interface BotEntryHandler {
  handler: (
    ctx: FlowEntry<BotContext>,
  ) => BotMenu<Menu> | Promise<BotMenu<Menu>>;
}

export interface BotOutputHandler {
  handler: (data: BotDataResponse) => Promise<FlowResponse>;
}
