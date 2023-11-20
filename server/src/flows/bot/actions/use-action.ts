import { contact } from '.';
import { BotMessage } from 'src/flows/types';

export const useAction = (sysResponse: BotMessage, answers: string[]) => {
  const actions: Record<
    string,
    (arg: BotMessage, answers: string[]) => BotMessage
  > = {
    // ! Add here more actions
    contact: contact,
  };

  const args = filterAnswers(sysResponse.parameters_required, answers);

  const action = actions[sysResponse.action];
  if (!action) throw new Error(`Action not supported: ${sysResponse.action}`);

  // if (sysResponse.data.option) {
  //   sysResponse.type = 'option';
  // }

  return action(sysResponse, args);
};

const filterAnswers = (count: number, answers: string[]): string[] => {
  return answers.slice(answers.length - count, answers.length);
};
