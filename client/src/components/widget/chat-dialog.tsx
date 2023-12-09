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
    <section className="h-full bg-c2 overflow-y-auto py-6 fadeIn__light" ref={messagesRef}>
      <MessagesContainer messages={messages} />
    </section>
  )
}
