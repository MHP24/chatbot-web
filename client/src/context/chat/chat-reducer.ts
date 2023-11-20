import { type OnMessage, type OnSession } from '../../types'
import { type ChatState } from '../../types/chat'

type Action = {
  type: '[Session] - Set online status'
  payload: boolean
} | {
  type: '[Session] - Start session'
  payload: OnSession
} | {
  type: '[Message] - Receive'
  payload: OnMessage
}

export const chatReducer = (state: ChatState, action: Action): ChatState => {
  switch (action.type) {
    case '[Session] - Set online status':
      return { ...state, isOnline: action.payload }

    case '[Session] - Start session':
      return {
        ...state,
        sessionId: action.payload.sessionId,
        flow: action.payload.flow
      }

    case '[Message] - Receive':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }

    default:
      return state
  }
}
