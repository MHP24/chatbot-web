import { useReducer, type FC, type PropsWithChildren, useEffect } from 'react'
import { ChatContext, chatReducer } from '.'
import { type ChatState } from '../../types/chat'
import { useSocket } from '../../hooks'
import {
  type OnLoad,
  type OnClose,
  type OnMessage,
  type OnSession,
  type OnTimeout
} from '../../types'
import Cookies from 'js-cookie'

const INITIAL_STATE: ChatState = {
  isClosed: false,
  isOnline: false,
  chatId: undefined,
  flow: undefined,
  messages: []
}

export const ChatProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)
  const { session, connect, disconnect, on, emit } = useSocket(import.meta.env.VITE_SERVER_URL)
  // * Initial session handling to set events on connection ready
  useEffect(() => {
    dispatch({
      type: '[Session] - Set online status',
      payload: session.isOnline
    })

    // * Events from backend
    if (session.isOnline) {
      console.log('Events started...')
      on<OnSession>('session', startSession)
      on<OnMessage>('message', receiveMessage)
      on<OnLoad>('load', loadChat)
      on<OnClose>('close', closeChat)
      on<OnTimeout>('timeout', timeoutChat)
    }
  }, [session])

  // * Chat id creation using REST service
  const createChat = async (time: number = 2000) => {
    try {
      const data = await fetch(
        import.meta.env.VITE_SERVER_URL +
          `/chats/request?chatId=${Cookies.get('chat_session')}`
      )
      const { chatId } = await data.json()
      setTimeout(() => {
        Cookies.set('chat_session', chatId)
        console.log({ chatId })
        connect(chatId)
      }, time)
    } catch (error) {
      return null
    }
  }

  // * Manual connection setter when it's needed
  const establishConnection = async () => {
    try {
      if (!state.isOnline && !state.isClosed) {
        await createChat()
      }
    } catch (error) {
      console.error(error)
    }
  }

  // * On session confirmed by server
  const startSession = (sessionContext: OnSession) => {
    Cookies.set('chat_session', sessionContext.chatId)
    dispatch({
      type: '[Session] - Start session',
      payload: sessionContext
    })
  }

  // * Messages from server
  const receiveMessage = (onMessage: OnMessage) => {
    const { message } = onMessage
    dispatch({
      type: '[Message] - Receive',
      payload: message
    })
  }

  // * Send messages using input text field
  const sendInputMessage = (message: string) => {
    emit('message', {
      origin: 'input',
      message
    })
    dispatch({
      type: '[Message] - Add message',
      payload: {
        side: 'client',
        origin: 'input',
        message
      }
    })
  }

  // * Send messages using buttons
  const sendOptionMessage = (label: string, redirect: string) => {
    emit('message', {
      origin: 'option',
      message: redirect
    })
    dispatch({
      type: '[Message] - Add message',
      payload: {
        side: 'client',
        origin: 'option',
        message: label
      }
    })
  }

  // * On chat identified from server that receives all messages
  const loadChat = (data: OnLoad) => {
    dispatch({
      type: '[Chat] - Load',
      payload: data
    })
  }

  // * Chat close using socket controller
  const closeChat = () => {
    disconnect()
    dispatch({
      type: '[Chat] - Close',
      payload: {
        ...INITIAL_STATE,
        isClosed: true,
        isOnline: false
      }
    })
  }

  // * On timeout detected from backend
  const timeoutChat = (data: OnTimeout) => {
    dispatch({
      type: '[Chat] - Close',
      payload: {
        ...INITIAL_STATE,
        isClosed: true,
        isOnline: false,
        closeReason: data.reason
      }
    })
  }

  // * If a recent chat was closed and the user requires create another instance
  const createNewChat = async () => {
    await createChat(0)
  }

  return (
    <ChatContext.Provider
      value={{
        ...state,
        establishConnection,
        sendInputMessage,
        sendOptionMessage,
        createNewChat
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
