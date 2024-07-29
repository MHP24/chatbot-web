import { Socket } from 'socket.io';

export const extractChatId = (socket: Socket): string => {
  const chatId = socket.handshake.headers.authentication;
  if (!chatId) {
    throw new Error('Chat id not found');
  }

  return chatId as string;
};
