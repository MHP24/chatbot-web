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
  type: '[Message] - Add option message'
  payload: string
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
        messages: [...state.messages, {
          ...action.payload,
          side: 'system'
        }]
      }

    case '[Message] - Add option message':
      return {
        ...state
      //   messages: [
      //     ...state.messages,
      //     {
      //       side: 'client',
      //       type: 'input',
      //       body: [{
      //         type: 'text',
      //         text: action.payload
      //       }]
      //     } as Message
      //   ]
      // }
      }
    default:
      return state
  }
}
