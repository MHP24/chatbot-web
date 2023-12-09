import { ChatSide, EntryClientMessage, MessageOrigin } from 'src/common';
import { BotContext, BotMenu, Input, Option } from '../types';

export const buildContext = (
  context: BotContext | undefined,
  clientMessage: { equivalentMessage?: string } & EntryClientMessage,
  botResponse: BotMenu<Input | Option>,
  clientTimestamp: number,
  botTimestamp: number,
): BotContext => {
  // * Initial context for specific use cases
  if (!context) {
    return {
      currentMenu: botResponse,
      variables: [],
      messages: [],
      nodes: [
        {
          reference: clientMessage.message,
          timestamp: clientTimestamp,
        },
      ],
      history: [
        {
          side: 'bot',
          content: botResponse,
          timestamp: botTimestamp,
        },
      ],
    };
  }

  // * Already having a context...
  const ctx = {
    ...context,
    currentMenu: botResponse,
    nodes: [...context?.nodes],
    history: [
      ...context?.history,
      {
        side: 'client' as ChatSide,
        content: {
          origin: clientMessage.origin as MessageOrigin,
          message: clientMessage.equivalentMessage ?? clientMessage.message,
        },
        timestamp: clientTimestamp,
      },
      {
        side: 'bot' as ChatSide,
        content: botResponse,
        timestamp: botTimestamp,
      },
    ],
    messages: [...context?.messages],
  };

  clientMessage.origin === 'option' &&
    ctx.nodes.push({
      reference: clientMessage.message,
      timestamp: clientTimestamp,
    });

  clientMessage.origin === 'input' &&
    ctx.messages.push({
      content: clientMessage.message,
      timestamp: clientTimestamp,
    });

  return ctx;
};
