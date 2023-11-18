export type MessageT = 'option' | 'text';

export type Message = {
  sessionId: string;
  message: {
    type: MessageT;
    data: string;
  };
  timestamp: number;
  context: any;
};
