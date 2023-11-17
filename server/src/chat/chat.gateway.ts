import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

// ! http://127.0.0.1:3001/socket.io/socket.io.js
@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  logger = new Logger('ChatGateway');

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    this.logger.log(`${client.id} connected`);
    this.chatService.onConnect(client.handshake.headers.sessionId as string);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected ${client.id}`);
    // console.log({ client });
  }

  @SubscribeMessage('message')
  onMessage() {}

  @SubscribeMessage('survey')
  onSurvey() {}
}
