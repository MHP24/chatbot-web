import { ChatContext } from '.';
import { BodyElement, Option } from 'src/flows/types';

export type MessageType = 'input' | 'option';

export type EntryClientMessage = {
  type: MessageType;
  message: string;
};

export type ClientMessage = {
  sessionId: string;
  message: {
    type: MessageType;
    data: string;
  };
  timestamp: number;
  context: ChatContext;
};

export type SystemMessage = {
  type: MessageType;
  header: string;
  body: BodyElement[];
  option?: Option[];
};
