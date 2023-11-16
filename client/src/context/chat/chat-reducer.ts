import { type ChatState } from '../../types/chat'

// TODO: Create actions for events (listeners)
type Action = {
  type: '[Session] - Set online status'
  payload: boolean
}

export const chatReducer = (state: ChatState, action: Action): ChatState => {
  switch (action.type) {
    case '[Session] - Set online status':
      return { ...state, isOnline: action.payload }

    default:
      return state
  }
}
