import { useContext } from 'react'
import { ChatContext } from '../context'

export const useChat = () => {
  return useContext(ChatContext)
}
