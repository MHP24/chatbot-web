import { BotMenu, Input, Option } from '../../flows/types';
import { ChatContext } from '.';

export type MessageOrigin = 'input' | 'option';

export type EntryClientMessage = {
  origin: MessageOrigin;
  message: string;
};

export type ClientMessage = {
  chatId: string;
  message: {
    type: ClientMessageType;
    data: string;
  };
  timestamp: number;
  context: ChatContext;
};

export type SystemMessage = {
  timestamp: number;
} & BotMenu<Input | Option>;
