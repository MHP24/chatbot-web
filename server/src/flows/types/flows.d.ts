import { EntryClientMessage } from '../../common';

export type FlowEntry<T> = {
  chatId: string;
  message: EntryClientMessage | null;
  context?: T;
};
