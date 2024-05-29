import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import {
  OnSession,
  OnMessage,
  OnClose,
  OnTimeout,
  OnLoad,
} from '../types';

@Injectable()
export class EventsService {
  private sessionSubject = new Subject<OnSession>();
  private messageSubject = new Subject<OnMessage>();
  private closeSubject = new Subject<OnClose>();
  private timeoutSubject = new Subject<OnTimeout>();
  private loadSubject = new Subject<OnLoad>();

  // * Listeners
  onSessionEvent() {
    return this.sessionSubject.asObservable();
  }

  onMessageEvent() {
    return this.messageSubject.asObservable();
  }

  onCloseEvent() {
    return this.closeSubject.asObservable();
  }

  onTimeoutEvent() {
    return this.timeoutSubject.asObservable();
  }

  onLoadEvent() {
    return this.loadSubject.asObservable();
  }

  // * Emitters
  emitSessionEvent(args: OnSession) {
    this.sessionSubject.next(args);
  }

  emitMessageEvent(args: OnMessage) {
    this.messageSubject.next(args);
  }

  emitCloseEvent(args: OnClose) {
    this.closeSubject.next(args);
  }

  emitTimeoutEvent(args: OnTimeout) {
    this.timeoutSubject.next(args);
  }

  emitLoadEvent(args: OnLoad) {
    this.loadSubject.next(args);
  }
}
