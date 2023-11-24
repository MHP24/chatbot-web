import { Socket } from 'socket.io';
import { Flow, SystemMessage } from '../../common';

export type OnSession = {
  client: Socket;
  chatId: string;
  flow: Flow;
};

export type OnMessage = SystemMessage;
