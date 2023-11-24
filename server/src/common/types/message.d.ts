import { BotBodyMessage, Option } from '../../flows';
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
  type: MessageOrigin;
  header?: string;
  body?: Array<BotBodyMessage>;
  data?: Option;
  timestamp: number;
};
