import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { EventsService } from './events';
import { OnClose, OnMessage, OnSession } from './types';
import { EntryClientMessage } from 'src/common';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  wss: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly eventsService: EventsService,
  ) {
    // * On new session confirm
    this.eventsService
      .onSessionEvent()
      .subscribe((args) => this.emitSession(args));

    // * On new message from flow
    this.eventsService
      .onMessageEvent()
      .subscribe((args) => this.emitMessage(args));

    // * On close
    this.eventsService.onCloseEvent().subscribe((args) => this.emitClose(args));
  }

  // * Listeners
  async handleConnection(client: Socket) {
    const chatId = client.handshake.headers.authentication as string;
    return await this.chatService.onConnect(client, chatId);
  }

  handleDisconnect(client: Socket) {
    const chatId = client.handshake.headers.authentication as string;
    this.chatService.onDisconnect(chatId);
  }

  @SubscribeMessage('message')
  async onMessage(client: Socket, payload: EntryClientMessage) {
    const chatId = client.handshake.headers.authentication as string;
    return await this.chatService.onMessage(chatId, payload);
  }

  // * Emitters
  emitSession(args: OnSession) {
    const { client, chatId, flow } = args;
    client.join(chatId);
    return this.wss.to(chatId).emit('session', {
      chatId,
      flow,
    });
  }

  emitMessage(args: OnMessage) {
    const { chatId, message } = args;
    return this.wss.to(chatId).emit('message', { message });
  }

  emitClose(args: OnClose) {
    const { chatId, message = undefined } = args;
    // TODO: handleClose
    return this.wss.to(chatId).emit('close', { message });
  }
}
