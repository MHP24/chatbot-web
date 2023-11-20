import { BotMessage } from '../../flows/types';
import { EntryClientMessage } from '.';

export type Flow = 'bot' | 'agent' | 'survey';
export type ChatSide = 'client' | 'bot' | 'agent';

export type Chat = {
  sessionId: string;
  startDate: number;
  lastUserInteraction: number;
  context: ChatContext;
  //TODO: assign types
  log: any;
  history: any;
};

export type ChatContext = {
  currentFlow: Flow;
  bot?: BotContext;
  // More flows...
};

export type BotContext = {
  currentMenu: string;
  data: BotMessage;
  messages: Array<{
    side: ChatSide;
    content: BotMessage | EntryClientMessage;
    timestamp: number;
    reference?: string | null;
  }>;
};
