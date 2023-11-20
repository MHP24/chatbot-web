import { Injectable } from '@nestjs/common';
import { MessageType } from 'src/common/types';
import { BotMessage } from 'src/flows/types';

@Injectable()
export class ActionsService {
  // ! Main handler
  handleNextStep(
    flowType: MessageType,
    botResponse: BotMessage,
    answers: string[],
  ): BotMessage {
    const handler: Record<
      string,
      (arg: BotMessage, arg2: string[]) => BotMessage
    > = {
      action: this.useAction,
    };

    const execHandler = handler[flowType];

    if (!execHandler) throw new Error(`Handler not implemented: ${flowType}`);
    return execHandler(botResponse, answers);
  }

  // ! Action separator
  useAction = (sysResponse: BotMessage, answers: string[]) => {
    const actions: Record<
      string,
      (arg: BotMessage, answers: string[]) => BotMessage
    > = {
      // Add here more actions
      contact: this.contact,
    };

    const args = this.filterAnswers(sysResponse.parameters_required, answers);

    const action = actions[sysResponse.action];
    if (!action) throw new Error(`Action not supported: ${sysResponse.action}`);

    return action(sysResponse, args);
  };

  // !Filter for answers required
  filterAnswers(count: number, answers: string[]): string[] {
    return answers.slice(answers.length - count, answers.length);
  }

  // ! Methods (actions)
  contact(sysResponse: BotMessage, answers: string[]): BotMessage {
    let { header } = sysResponse;

    answers.forEach((answer, i) => {
      header = header.replace(`$${i}`, answer);
    });

    return {
      ...sysResponse,
      header,
    };
  }
}
