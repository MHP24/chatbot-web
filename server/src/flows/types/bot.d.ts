import { ChatSide, MessageOrigin } from '../../common';
import { BotMenu, Menu, Option, Input } from '.';

export type ClientMessage = {
  origin: MessageOrigin;
  message: string;
};

export type BotContext = {
  variables: Array<{
    reference: string;
    value: unknown;
  }>;
  currentMenu: BotMenu<Option | Input>;
  messages: Array<{
    content: string;
    timestamp: number;
  }>;
  nodes: Array<{
    reference: string;
    timestamp: number;
  }>;
  history: Array<{
    side: ChatSide;
    content: BotMenu<Menu> | ClientMessage;
    timestamp: number;
  }>;
};
