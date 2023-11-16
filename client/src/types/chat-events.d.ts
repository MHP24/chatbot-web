import { type Message } from '.'
import { type CurrentFlow } from './chat'

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
  flow: CurrentFlow
  name?: string
}

export type OnClose = {
  reason: string
}

/* Emitters */
export type EmitMessage = {
  message: string
}
