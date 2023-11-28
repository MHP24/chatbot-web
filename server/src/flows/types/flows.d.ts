import { EntryClientMessage } from '../../common';
import { BotMenu, Input, Option } from './bot-messages';

export type FlowEntry<T> = {
  chatId: string;
  message: EntryClientMessage | null;
  context?: T;
};

export type FlowCloseResponse = {
  type: 'close';
  response: BotMenu<Input | Option>;
  timestamp: number;
};

export type FlowMessageResponse = {
  type: 'message';
  response: BotMenu<Input | Option>;
  timestamp: number;
};

// export type FlowTransferResponse = {
//   type: 'transfer';
//   hasToTransfer: boolean;
//   destination: string;
// };

export type FlowResponse = FlowCloseResponse | FlowMessageResponse;
// | FlowTransferResponse
