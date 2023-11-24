import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class ChatEventsService {
  private subject = new Subject<{
    chatId: string;
    message: any;
  }>();

  onMessageEvent() {
    return this.subject.asObservable();
  }

  emitMessageEvent(chatId: string, message: any) {
    this.subject.next({ chatId, message });
  }
}
