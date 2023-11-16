import { type Message } from '.'
import { type Flow } from './chat'

/* Listeners */
export type OnSession = {
  sessionId: string
}

export type OnLoad = {
  messages: Message[]
}

export type OnMessage = {
  message: Message
}

export type OnTransfer = {
  flow: Flow
  name?: string
}

export type OnClose = {
  reason: string
  title: string
  detail: string
}

/* Emitters */
export type EmitMessage = {
  message: string
}
