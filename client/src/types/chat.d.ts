import { type Message } from '.'

export type Flow = 'bot' | 'agent' | 'survey'

export type Chat = {
  isOnline: boolean
  sessionId?: string
  flow?: Flow
  messages: Message[]
}

export type ChatState = & Chat

export type ChatContextT = {
  establishConnection: () => void
  sendMessage: (type: string, message: string) => void
} & Chat
