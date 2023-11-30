import { Socket } from 'socket.io';
import { Flow, SystemMessage } from '../../common';

export type OnSession = {
  client: Socket;
  chatId: string;
  flow: Flow;
};

export type OnMessage = {
  chatId: string;
  message: SystemMessage;
};

export type OnClose = {
  chatId: string;
  message?: SystemMessage;
};

export type OnTimeout = {
  chatId: string;
  message: string;
};
