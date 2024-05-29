import {
  FlowEntry,
  BotContext,
  BotEntryResponse,
  BotDataResponse,
  FlowResponse,
} from '../types';

export interface BotEntryHandler {
  handler: (ctx: FlowEntry<BotContext>) => Promise<BotEntryResponse>;
}

export interface BotOutputHandler {
  handler: (data: BotDataResponse) => Promise<FlowResponse>;
}
