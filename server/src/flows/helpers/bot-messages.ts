import {
  BotContext,
  EntryClientMessage,
  SystemMessage,
} from '../../common/types';
import { MENU } from '../bot/menus/main';
import { getOptionBySelection, getOptionBySearch, handleNextStep } from '.';
import { BotResponse, Input } from '../types';

export const handleOptionMessage = (
  message: string,
  context: BotContext,
): BotResponse => {
  const option = getOptionBySelection(MENU, message);
  if (option) return { response: option };

  const { data, type } = context.data;

  const search = getOptionBySearch(data[type], message);
  if (search) return { response: getOptionBySelection(MENU, search.redirect) };

  // TODO: env or mock configuration
  return {
    response: {
      type: 'option',
      header: 'No he podido entender tu respuesta',
      body: [{ type: 'text', text: 'Selecciona una opción válida' }],
      data: {
        option: data[type],
      },
    } as SystemMessage,
  };
};

export const handleActionMessage = (
  message: string,
  context: BotContext,
): BotResponse => {
  // ! If other interaction is needed you must to change
  // ! action type -> option, and send the rest of options
  if (context.data.data.option) {
    context.data.type = 'option';
    return handleOptionMessage(message, context);
  }
};

export const handleInputMessage = (
  message: string,
  context: BotContext,
): BotResponse => {
  const { data, type } = context.data;
  const validation = data[type] as Input;

  if (validation.regex && !message.match(new RegExp(validation.regex))) {
    const invalidReturn = {
      ...context.data,
      data: {
        input: {
          ...context.data.data.input,
          input: validation.error_message,
        },
      },
    } as SystemMessage;

    return {
      response: invalidReturn,
      data: {
        isValidAnswer: false,
      },
    };
  }

  const nextStep = getOptionBySelection(
    MENU,
    validation.on_input_valid.redirect,
  );

  if (nextStep.type === 'input') {
    return { response: nextStep, data: { isValidAnswer: true } };
  }

  const answers = context.messages
    .filter(
      ({ side, reference }) =>
        side === 'client' && reference && reference === 'input',
    )
    .map(({ content }) => (content as EntryClientMessage).message);

  return {
    response: handleNextStep(nextStep.type, nextStep, [...answers, message]),
  };
};
