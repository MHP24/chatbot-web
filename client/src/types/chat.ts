import { type Message } from '.'

export type Flow = 'bot' | 'agent' | 'survey'

export type Chat = {
  isClosed: boolean
  closeReason?: string
  isOnline: boolean
  chatId?: string
  flow?: Flow
  messages: Message[]
}

export type ChatState = & Chat

export type ChatContextT = {
  establishConnection: () => Promise<void>
  sendInputMessage: (message: string) => void
  sendOptionMessage: (label: string, redirect: string) => void
  createNewChat: () => Promise<void>
} & Chat
