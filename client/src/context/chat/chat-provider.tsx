import { useReducer, type FC, type PropsWithChildren, useEffect } from 'react'
import { ChatContext, chatReducer } from '.'
import { type ChatState } from '../../types/chat'
import { useSocket } from '../../hooks'
import { type OnClose, type OnMessage, type OnSession } from '../../types'
import { v4 as uuid } from 'uuid' // TODO: Change this..

const INITIAL_STATE: ChatState = {
  isClosed: true,
  isOnline: false,
  chatId: undefined,
  flow: undefined,
  messages: []
}

export const ChatProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)
  const { session, connect, disconnect, on, emit } = useSocket(import.meta.env.VITE_SERVER_URL)

  useEffect(() => {
    dispatch({
      type: '[Session] - Set online status',
      payload: session.isOnline
    })

    if (session.isOnline) {
      on<OnSession>('session', startSession)
      on<OnMessage>('message', receiveMessage)
      on<OnClose>('close', closeChat)
    }
  }, [session])

  const establishConnection = () => {
    if (!state.isOnline && state.isClosed) {
      connect(uuid())
    }
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

  const sendInputMessage = (message: string) => {
    emit('message', {
      origin: 'input',
      message
    })
    dispatch({
      type: '[Message] - Add message',
      payload: message
    })
  }

  const sendOptionMessage = (label: string, redirect: string) => {
    emit('message', {
      origin: 'option',
      message: redirect
    })
    dispatch({
      type: '[Message] - Add message',
      payload: label
    })
  }

  const closeChat = () => {
    disconnect()
    dispatch({
      type: '[Chat] - Close',
      payload: {
        ...INITIAL_STATE,
        isClosed: true
      }
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
