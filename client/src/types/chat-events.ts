import { type MessageSide, type Message } from '.'
import { type Flow } from './chat'

/* Listeners */
export type OnSession = {
  chatId: string
  flow: Flow
}

export type OnLoad = {
  chatId: string
  messages: Array<{
    side: MessageSide
    content: Message
  }>
}

export type OnMessage = {
  message: Message
}

export type OnTransfer = {
  flow: Flow
  name?: string
}

export type OnTimeout = {
  reason: string
}

export type OnClose = {
  reason: string
  title: string
  detail: string
}

/* Emitters */
export type EmitMessage = {
  message?: Message
}
