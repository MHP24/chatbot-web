import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { ChatEventsService } from './chat-events.service';
import { OnSession } from './types';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  wss: Server;

  private logger = new Logger('ChatGateway');

  constructor(
    private readonly chatService: ChatService,
    private readonly chatEventsService: ChatEventsService,
  ) {
    // * On new session confirm
    this.chatEventsService
      .onSessionEvent()
      .subscribe((args) => this.emitSession(args));
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
}
