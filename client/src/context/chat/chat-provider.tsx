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
    console.log({ message })
    dispatch({
      type: '[Message] - Receive',
      payload: message
    })
  }

  const sendInputMessage = (message: string) => {
    emit('message', {
      type: 'input',
      message
    })
    dispatch({
      type: '[Message] - Add message',
      payload: message
    })
  }

  const sendOptionMessage = (label: string, redirect: string) => {
    emit('message', {
      type: 'option',
      message: redirect
    })
    dispatch({
      type: '[Message] - Add message',
      payload: label
    })
  }

  return (
    <ChatContext.Provider
      value={{
        ...state,
        establishConnection,
        sendInputMessage,
        sendOptionMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
