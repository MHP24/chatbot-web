import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { EventsService } from './events';
import { OnMessage, OnSession } from './types';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  wss: Server;

  private logger = new Logger('ChatGateway');

  constructor(
    private readonly chatService: ChatService,
    private readonly eventsService: EventsService,
  ) {
    // * On new session confirm
    this.eventsService
      .onSessionEvent()
      .subscribe((args) => this.emitSession(args));

    this.eventsService
      .onMessageEvent()
      .subscribe((args) => this.emitMessage(args));
  }

  // * Listeners
  async handleConnection(client: Socket) {
    const chatId = client.handshake.headers.authentication as string;
    this.logger.log('New connection');
    return await this.chatService.onConnect(client, chatId);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Disconnected ${client.id}`);
  }

  // @SubscribeMessage('message')
  // onMessage(client: Socket, payload: EntryClientMessage) {
  //   const sessionId = client.handshake.headers.authentication as string;
  //   this.chatService.onMessage(this.wss, sessionId, payload);
  // }

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
}
