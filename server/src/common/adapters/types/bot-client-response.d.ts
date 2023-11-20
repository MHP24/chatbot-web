import { BodyElement, Option } from '../../../flows/types/bot';

export type MessageTypeForClient = 'input' | 'option';

export type BotResponseAdapter = {
  type: MessageTypeForClient;
  header: string;
  body?: BodyElement[];
  data: {
    option?: Option[];
    input?: {
      detail?: string;
    };
  };
};

export type BotClientResponseAdapterT = {
  adapt: (arg: SystemMessage) => BotResponseAdapter;
};
