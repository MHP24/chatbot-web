import {
  ChatContext,
  ClientMessage,
  EntryClientMessage,
} from '../../common/types';
import { BotResponse } from '../types';

type Builder = {
  botResponse: BotResponse;
  clientMessage: ClientMessage;
};

export const buildBotContext = (data: Builder): ChatContext => {
  const { botResponse, clientMessage } = data;

  const clientEntry: EntryClientMessage = {
    type: clientMessage.message.type,
    message: clientMessage.message.data,
  };

  const contextUpdated: ChatContext = {
    ...clientMessage.context,
    bot: {
      currentMenu: clientMessage.message.data,
      data: botResponse.response,
      messages: [
        ...(clientMessage.context.bot?.messages ?? []),
        {
          side: 'client',
          content: clientEntry,
          timestamp: clientMessage.timestamp,
          reference: !data.botResponse.data
            ? null
            : data.botResponse.data.isValidAnswer
            ? 'input'
            : 'input-invalid',
        },
        {
          side: 'bot',
          content: botResponse.response,
          timestamp: Number(new Date()),
        },
      ],
    },
  };

  return contextUpdated;
};
