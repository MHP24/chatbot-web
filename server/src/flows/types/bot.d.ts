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
  // * Text messages (origin: input) from the user
  messages: Array<{
    content: string;
    timestamp: number;
  }>;
  // * Options or menus (origin: option) from the user
  nodes: Array<{
    reference: string;
    timestamp: number;
  }>;
  // * (origin: input, option) from the user and bot responses
  history: Array<{
    side: ChatSide;
    content: BotMenu<Menu> | ClientMessage;
    timestamp: number;
  }>;
};
