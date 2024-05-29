import { BotMenu, Input, Option } from '../../bot/types';
import { ChatContext } from './chat';

export type MessageOrigin = 'input' | 'option';

export type EntryClientMessage = {
  origin: MessageOrigin;
  message: string;
};

export type ClientMessage = {
  chatId: string;
  message: {
    type: any;
    data: string;
  };
  timestamp: number;
  context: ChatContext;
};

export type SystemMessage = {
  timestamp: number;
} & BotMenu<Input | Option>;
