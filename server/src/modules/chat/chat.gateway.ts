import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// * Services
import { ChatService } from './chat.service';
import { EventsService } from './events/events.service';
// * Types
import {
  EntryClientMessage,
  OnSession,
  OnMessage,
  OnClose,
  OnTimeout,
  OnLoad,
} from './types';
import { extractChatId } from './helpers';

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

    // * On inactivity timeout
    this.eventsService
      .onTimeoutEvent()
      .subscribe((args) => this.emitTimeout(args));

    // * On load (User reconnection with specific chatId)
    this.eventsService.onLoadEvent().subscribe((args) => this.emitLoad(args));
  }

  // * Listeners
  async handleConnection(client: Socket) {
    return await this.chatService.onConnect(client, extractChatId(client));
  }

  handleDisconnect(client: Socket) {
    this.chatService.onDisconnect(extractChatId(client));
  }

  @SubscribeMessage('message')
  async onMessage(client: Socket, payload: EntryClientMessage) {
    return await this.chatService.onMessage(extractChatId(client), payload);
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
    this.chatService.closeChat(chatId);
    return this.wss.to(chatId).emit('close', { message });
  }

  emitTimeout(args: OnTimeout) {
    const { chatId, reason } = args;
    this.wss.to(chatId).emit('timeout', { reason });
  }

  emitLoad(args: OnLoad) {
    const { chatId, messages, client } = args;
    client.join(chatId);
    return this.wss.to(chatId).emit('load', {
      chatId,
      messages,
    });
  }
}
