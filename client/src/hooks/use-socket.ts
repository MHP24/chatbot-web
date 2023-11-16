import { useState } from 'react'
import { io, type Socket } from 'socket.io-client'

type Session = {
  socket?: Socket
  isOnline: boolean
}

export const useSocket = (sessionId: string | null = null) => {
  const [session, setSession] = useState<Session>({
    socket: undefined,
    isOnline: false
  })

  const { socket } = session

  const connect = () => {
    const ioSession = io('http://127.0.0.1:3001', {
      extraHeaders: {
        sessionId: sessionId ?? ''
      }
    })

    ioSession.on('connect', () => {
      setSession({ ...session, socket: ioSession, isOnline: true })
    })

    ioSession.on('connect_error', (error) => {
      console.error('Connection error:', error)
    })
  }

  const disconnect = () => {
    socket?.disconnect()
  }

  const on = <T>(event: string, callback: (data: T) => void) => {
    socket?.on(event, callback)
  }

  const emit = <T>(event: string, data: T) => {
    socket?.emit(event, data)
  }

  return {
    on,
    emit,
    connect,
    session,
    disconnect
  }
}
