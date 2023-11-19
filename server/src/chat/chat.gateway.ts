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
import { EntryClientMessage } from 'src/common/types';

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
    this.logger.log(`Disconnected ${client.id}`);
  }

  @SubscribeMessage('message')
  onMessage(client: Socket, payload: EntryClientMessage) {
    const sessionId = client.handshake.headers.authentication as string;
    this.chatService.onMessage(this.wss, sessionId, payload);
  }

  @SubscribeMessage('survey')
  onSurvey() {}
}
