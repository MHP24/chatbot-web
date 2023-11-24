import { BotContext } from '../../flows/types';

export type Flow = 'bot' | 'agent' | 'survey';
export type ChatSide = 'client' | 'bot' | 'agent';

export type Chat = {
  chatId: string;
  startedAt: number;
  lastUserInteraction: number;
  context: ChatContext;
};

export type ChatContext = {
  currentFlow: Flow;
  bot?: BotContext;
};
