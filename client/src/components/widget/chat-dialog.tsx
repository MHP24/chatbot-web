import { useEffect, useRef } from 'react'
import { useChat } from '../../hooks'
import { MessagesContainer } from '../messages'

export const ChatDialog = () => {
  const { messages } = useChat()
  const messagesRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }

  return (
    <main className="h-full bg-c2 overflow-y-auto py-6" ref={messagesRef}>
      <MessagesContainer/>
    </main>
  )
}
