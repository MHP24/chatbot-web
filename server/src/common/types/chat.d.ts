export type Flow = 'bot' | 'agent' | 'survey';

export type Chat = {
  sessionId: string;
  currentFlow: Flow;
  startDate: number;
  context: any; //TODO: assign types
  log: any; //TODO: assign types
  history: any; //TODO: assign types
};

export type ChatContext = 1; // TODO:
