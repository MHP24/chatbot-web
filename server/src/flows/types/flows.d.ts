export type FlowEntry<T> = {
  chatId: string;
  message: EntryClientMessage | null;
  context?: T;
};
