import { BotMessage } from 'src/flows/types';

export const contact = (
  sysResponse: BotMessage,
  answers: string[],
): BotMessage => {
  let { header } = sysResponse;

  answers.forEach((answer, i) => {
    header = header.replace(`$${i}`, answer);
  });

  return {
    ...sysResponse,
    header,
  };
};
