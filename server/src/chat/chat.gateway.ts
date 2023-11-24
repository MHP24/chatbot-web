import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ChatEventsService } from './chat-events.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  logger = new Logger('ChatGateway');

  constructor(
    private readonly chatService: ChatService,
    private readonly chatEventsService: ChatEventsService,
  ) {
    this.chatEventsService.onMessageEvent().subscribe(({ chatId, message }) => {
      console.log({ chatId, message });
    });
  }

  @WebSocketServer()
  wss: Server;

  handleConnection(client: Socket) {
    const chatId = (client.handshake.headers.authentication as string) ?? '';
    this.logger.log('New connection');
    return this.chatService.connect(chatId);
    // return this.chatService.onConnect(
    //   this.wss,
    //   client,
    //   (client.handshake.headers.authentication as string) ?? '',
    // );
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Disconnected ${client.id}`);
  }

  // @SubscribeMessage('message')
  // onMessage(client: Socket, payload: EntryClientMessage) {
  //   const sessionId = client.handshake.headers.authentication as string;
  //   this.chatService.onMessage(this.wss, sessionId, payload);
  // }
}
