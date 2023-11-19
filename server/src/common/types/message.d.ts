import { ChatContext } from '.';
import { BodyElement, Input, Option } from 'src/flows/types';

export type MessageType =
  | 'input'
  | 'option'
  | 'close'
  | 'action'
  | 'action_with_close';

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
  header?: string;
  body?: BodyElement[];
  data: {
    option?: Option[];
    input?: Input;
  };
};
