import {
  BotContext,
  BotDataResponse,
  BotEntryResponse,
  FlowEntry,
  FlowResponse,
} from 'src/flows/types';

export interface BotEntryHandler {
  handler: (ctx: FlowEntry<BotContext>) => Promise<BotEntryResponse>;
}

export interface BotOutputHandler {
  handler: (data: BotDataResponse) => Promise<FlowResponse>;
}
