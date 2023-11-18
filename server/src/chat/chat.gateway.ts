import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

// ! http://127.0.0.1:3001/socket.io/socket.io.js
@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  logger = new Logger('ChatGateway');

  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  wss: Server;

  handleConnection(client: Socket) {
    return this.chatService.onConnect(
      this.wss,
      client,
      (client.handshake.headers.authentication as string) ?? '',
    );
  }

  handleDisconnect(client: Socket) {
    // TODO: Get headers and setTimeout
    console.log(`Disconnected ${client.id}`);
  }

  @SubscribeMessage('message')
  onMessage() {}

  @SubscribeMessage('survey')
  onSurvey() {}
}
