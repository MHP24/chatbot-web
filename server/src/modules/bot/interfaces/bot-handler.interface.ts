import { FlowEntry, FlowResponse } from '../../flows/types';
import { BotContext, BotEntryResponse, BotDataResponse } from '../types';

export interface BotEntryHandler {
  handle(ctx: FlowEntry<BotContext>): Promise<BotEntryResponse>;
}

export interface BotOutputHandler {
  handler: (data: BotDataResponse) => Promise<FlowResponse>;
}
