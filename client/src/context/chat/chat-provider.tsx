import { useReducer, type FC, type PropsWithChildren, useEffect } from 'react'
import { ChatContext, chatReducer } from '.'
import { type ChatState } from '../../types/chat'
import { useSocket } from '../../hooks'

const INITIAL_STATE: ChatState = {
  isOnline: false,
  sessionId: undefined,
  flow: undefined,
  messages: []
}

export const ChatProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)
  const { session, connect } = useSocket()

  useEffect(() => {
    dispatch({
      type: '[Session] - Set online status',
      payload: session.isOnline
    })

    // TODO: if online init Listeners
  }, [session])

  const establishConnection = () => {
    !state.isOnline && connect()
  }

  return (
    <ChatContext.Provider value={{ ...state, establishConnection }}>
      { children }
    </ChatContext.Provider>
  )
}
