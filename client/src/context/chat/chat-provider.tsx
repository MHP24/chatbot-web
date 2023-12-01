import { useReducer, type FC, type PropsWithChildren, useEffect } from 'react'
import { ChatContext, chatReducer } from '.'
import { type ChatState } from '../../types/chat'
import { useSocket } from '../../hooks'
import { type OnLoad, type OnClose, type OnMessage, type OnSession } from '../../types'
import Cookies from 'js-cookie'

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
      on<OnLoad>('load', loadChat)
      on<OnClose>('close', closeChat)
    }
  }, [session])

  const establishConnection = async () => {
    try {
      if (!state.isOnline && state.isClosed) {
        const data = await fetch(
          import.meta.env.VITE_SERVER_URL +
        `/chats/request?chatId=${Cookies.get('chat_session')}`
        )
        const { chatId } = await data.json()
        setTimeout(() => {
          Cookies.set('chat_session', chatId)

          connect(chatId)
        }, 2000)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const startSession = (sessionContext: OnSession) => {
    Cookies.set('chat_session', sessionContext.chatId)
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
      payload: {
        origin: 'input',
        message
      }
    })
  }

  const sendOptionMessage = (label: string, redirect: string) => {
    emit('message', {
      origin: 'option',
      message: redirect
    })
    dispatch({
      type: '[Message] - Add message',
      payload: {
        origin: 'option',
        message: label
      }
    })
  }

  const loadChat = (data: OnLoad) => {
    console.log({ data })
    dispatch({
      type: '[Chat] - Load',
      payload: data
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
