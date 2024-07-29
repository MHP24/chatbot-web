import { BotMessageType } from '../types';
import { BotEntryHandler } from './bot-handler.interface';

export interface EntriesCreator {
  handleEntriesCreation(botMessageType: BotMessageType): BotEntryHandler;
}
