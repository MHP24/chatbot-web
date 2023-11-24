import { type Message, type OnSession } from '../../types'
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
  payload: string
} | {
  type: '[Chat] - Close'
  payload: ChatState
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
        }]
      }

    case '[Message] - Add message':
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            type: 'input',
            side: 'client',
            data: {
              input: {
                detail: action.payload
              }
            },
            timestamp: Number(new Date())
          }
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
