import { BotMessageType } from '../types';
import { BotOutputHandler } from './bot-handler.interface';

export interface OutputsCreator {
  handleOutputsCreation(botMessageType: BotMessageType): BotOutputHandler;
}
