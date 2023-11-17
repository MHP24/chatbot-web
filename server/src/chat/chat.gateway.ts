import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';

// ! http://127.0.0.1:3001/socket.io/socket.io.js
@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(client.handshake.headers);

    // const handshake = this.chatService.onConnect(client, client.handshake.headers)
    console.log(`Connected ${client.id}`);
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
