export type MessageT = 'option' | 'text' | 'question';

export type Message = {
  sessionId: string;
  message: {
    type: MessageT;
    data: string;
  };
  timestamp: number;
  context: any;
};
