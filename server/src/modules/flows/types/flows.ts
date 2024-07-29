import { EntryClientMessage } from '../../chat/types/message';
import { BotMenu, Input, Option } from '../../bot/types';

export enum Flow {
  bot = 'bot',
  agent = 'agent',
  survey = 'survey',
}

export enum FlowEnumResponse {
  close = 'close',
  message = 'message',
}

export type FlowEntry<T> = {
  chatId: string;
  message: EntryClientMessage | null;
  context?: T;
};

export type FlowResponse = {
  type: FlowEnumResponse;
  response: BotMenu<Input | Option>;
  timestamp: number;
};

// export type FlowMessageResponse = {
//   type: 'message';
//   response: BotMenu<Input | Option>;
//   timestamp: number;
// };

// export type FlowTransferResponse = {
//   type: 'transfer';
//   hasToTransfer: boolean;
//   destination: string;
// };

// export type FlowResponse = FlowCloseResponse | FlowMessageResponse;
// | FlowTransferResponse
