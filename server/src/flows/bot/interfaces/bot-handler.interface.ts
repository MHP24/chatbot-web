import { BotContext, BotMenu, FlowEntry, Menu } from 'src/flows/types';

export interface BotHandler {
  handler: (
    ctx: FlowEntry<BotContext>,
  ) => BotMenu<Menu> | Promise<BotMenu<Menu>>;
}
