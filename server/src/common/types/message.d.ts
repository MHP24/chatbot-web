import { BodyElement, Option } from 'src/flows/types';

export type MessageType = 'input' | 'option';

export type ClientMessage = {
  sessionId: string;
  message: {
    type: MessageType;
    data: string;
  };
  timestamp: number;
  context: any;
};

export type SystemMessage = {
  type: MessageType;
  header: string;
  body: BodyElement[];
  option?: Option[];
};
