import { EntryClientMessage } from '../../common';
import { BotMenu, Input, Option } from './bot-messages';

export type FlowEntry<T> = {
  chatId: string;
  message: EntryClientMessage | null;
  context?: T;
};

export type FlowCloseResponse = {
  type: 'close';
  hasToClose: boolean;
};

export type FlowTransferResponse = {
  type: 'transfer';
  hasToTransfer: boolean;
  destination: string;
};

export type FlowMessageResponse = {
  type: 'message';
  response: BotMenu<Input | Option>;
};

export type FlowResponse = {
  timestamp: number;
} & (FlowCloseResponse | FlowTransferResponse | FlowBotMessageResponse);
