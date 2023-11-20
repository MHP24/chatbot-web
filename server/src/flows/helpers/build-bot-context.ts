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
  console.log({ data });
  const { botResponse, clientMessage } = data;

  const clientEntry: EntryClientMessage = {
    type: clientMessage.message.type,
    message: clientMessage.message.data,
  };

  console.log({ clientEntry });

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
        },
        {
          side: 'bot',
          content: botResponse.response,
        },
      ],
    },
  };

  // const handleByType: Record<string, () => void> = {
  //   option: handleOptionContext,
  //   input: handleInputContext,
  // };
  //

  return contextUpdated;
};

export const handleInputContext = () => {};

export const handleOptionContext = () => {};
