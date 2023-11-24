import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { OnSession, OnMessage } from './types';

@Injectable()
export class ChatEventsService {
  private sessionSubject = new Subject<OnSession>();
  private messageSubject = new Subject<OnMessage>();

  // * Listeners
  onSessionEvent() {
    return this.sessionSubject.asObservable();
  }

  onMessageEvent() {
    return this.messageSubject.asObservable();
  }

  // * Emitters
  emitSessionEvent(args: OnSession) {
    this.sessionSubject.next(args);
  }

  emitMessageEvent(args: OnMessage) {
    this.messageSubject.next(args);
  }

  // TODO: Add close
}
