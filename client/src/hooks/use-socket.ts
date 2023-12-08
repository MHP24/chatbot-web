import { useEffect, useState } from 'react'
import { io, type Socket } from 'socket.io-client'

type Session = {
  socket?: Socket
  isOnline: boolean
}

export const useSocket = (serverUrl: string) => {
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

  const connect = (authentication = '') => {
    const ioSession = io(serverUrl, {
      extraHeaders: {
        authentication
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
