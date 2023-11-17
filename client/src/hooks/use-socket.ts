import { useEffect, useState } from 'react'
import { io, type Socket } from 'socket.io-client'

type Session = {
  socket?: Socket
  isOnline: boolean
}

export const useSocket = (authentication: string | null = null) => {
  const [session, setSession] = useState<Session>({
    socket: undefined,
    isOnline: false
  })
  const { socket } = session

  useEffect(() => {
    return () => {
      session.socket?.disconnect()
    }
  }, [session])

  const connect = () => {
    const ioSession = io('http://127.0.0.1:3001', {
      extraHeaders: {
        authentication: authentication ?? ''
      }
    }).connect()

    setSession({
      ...session,
      socket: ioSession,
      isOnline: true
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
