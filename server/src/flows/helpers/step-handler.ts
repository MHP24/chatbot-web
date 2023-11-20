import { MessageType } from 'src/common/types';
import { useAction } from '../bot/actions';
import { BotMessage } from '../types';

export const handleNextStep = (
  flowType: MessageType,
  botResponse: BotMessage,
  answers: string[],
): BotMessage => {
  const handler: Record<
    string,
    (arg: BotMessage, arg2: string[]) => BotMessage
  > = {
    action: useAction,
  };

  const execHandler = handler[flowType];

  if (!execHandler) throw new Error(`Handler not implemented: ${flowType}`);
  return execHandler(botResponse, answers);
};
