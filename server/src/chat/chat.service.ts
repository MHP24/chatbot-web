import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  // Listeners
  onConnect() {}
  onDisconnect() {}
  onMessage() {}
  onSurvey() {}

  // Emitters
  emitLoad() {}
  emitMessage() {}
  emitTransfer() {}
  emitClose() {}
}
