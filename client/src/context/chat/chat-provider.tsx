import { useReducer, type FC, type PropsWithChildren, useEffect } from 'react'
import { ChatContext, chatReducer } from '.'
import { type ChatState } from '../../types/chat'
import { useSocket } from '../../hooks'
import { type OnMessage, type OnSession } from '../../types'
import { v4 as uuid } from 'uuid' // TODO: Change this..

const INITIAL_STATE: ChatState = {
  isOnline: false,
  sessionId: undefined,
  flow: undefined,
  messages: []
}

export const ChatProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)
  const { session, connect, on, emit } = useSocket()

  useEffect(() => {
    dispatch({
      type: '[Session] - Set online status',
      payload: session.isOnline
    })

    if (session.isOnline) {
      on<OnSession>('session', startSession)
      on<OnMessage>('message', receiveMessage)
    }
  }, [session])

  const establishConnection = () => {
    !state.isOnline && connect(uuid())
  }

  const startSession = (sessionContext: OnSession) => {
    dispatch({
      type: '[Session] - Start session',
      payload: sessionContext
    })
  }

  const receiveMessage = (onMessage: OnMessage) => {
    const { message } = onMessage
    dispatch({
      type: '[Message] - Receive',
      payload: message
    })
  }

  const sendMessage = (type: string, message: string) => {
    emit('message', {
      type,
      message
    })
  }

  const sendOption = (label: string, redirect: string) => {
    console.log({ label, redirect })
    sendMessage('option', redirect)
    dispatch({
      type: '[Message] - Add input message',
      payload: label
    })
  }

  return (
    <ChatContext.Provider
      value={{
        ...state,
        establishConnection,
        sendMessage,
        sendOption
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
