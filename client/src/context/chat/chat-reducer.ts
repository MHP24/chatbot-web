import { type OnLoad, type Message, type OnSession, type ClientMessage, type BotMessage } from '../../types'
import { type ChatState } from '../../types/chat'

type Action = {
  type: '[Session] - Set online status'
  payload: boolean
} | {
  type: '[Session] - Start session'
  payload: OnSession
} | {
  type: '[Message] - Receive'
  payload: Message
} | {
  type: '[Message] - Add message'
  payload: ClientMessage
} | {
  type: '[Chat] - Close'
  payload: ChatState
} | {
  type: '[Chat] - Load'
  payload: OnLoad
}

export const chatReducer = (state: ChatState, action: Action): ChatState => {
  switch (action.type) {
    case '[Session] - Set online status':
      return { ...state, isOnline: action.payload }

    case '[Session] - Start session':
      return {
        ...state,
        chatId: action.payload.chatId,
        flow: action.payload.flow,
        isClosed: false
      }

    case '[Message] - Receive':
      return {
        ...state,
        messages: [...state.messages, {
          ...action.payload,
          side: 'system'
        } as BotMessage]
      }

    case '[Message] - Add message':
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            side: action.payload.side,
            origin: action.payload.origin,
            message: action.payload.message,
            timestamp: Number(new Date())
          }

        ]
      }

    case '[Chat] - Load':
      return {
        ...state,
        chatId: action.payload.chatId,
        messages: [
          ...state.messages,
          ...(action.payload.messages.map(({ content, side }) => {
            return {
              ...content,
              side: side !== 'client' ? 'system' : 'client'
            }
          }) as Message[])
        ]
      }

    case '[Chat] - Close':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}
