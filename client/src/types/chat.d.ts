import { type Message } from '.'

export type Flow = 'bot' | 'agent' | 'survey'

export type Chat = {
  isOnline: boolean
  sessionId?: string
  flow?: Flow
  messages: Message[]
}

export type ChatState = & Chat

// TODO: add fns
export type ChatContextT = {
  establishConnection: () => void
} & Chat
