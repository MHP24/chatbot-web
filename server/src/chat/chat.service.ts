import { Injectable } from '@nestjs/common';
import { ChatEventsService } from './chat-events.service';

@Injectable()
export class ChatService {
  constructor(private readonly chatEventsService: ChatEventsService) {}

  connect(chatId: string) {
    this.chatEventsService.emitMessageEvent(chatId, 'ok form events');
  }
}
