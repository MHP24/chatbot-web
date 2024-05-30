import { BotContext } from '../../bot/types';
import { Flow } from '../../flows/types';

export enum ChatSide {
  client = 'client',
  bot = 'bot',
  agent = 'agent',
}

export type Chat = {
  chatId: string;
  startedAt: number;
  context: ChatContext;
};

export type ChatContext = {
  currentFlow: Flow;
  bot?: BotContext;
};
