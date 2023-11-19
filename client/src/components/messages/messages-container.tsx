import { TextMessage } from '.'
import { useChat } from '../../hooks'

export const MessagesContainer = () => {
  const { messages } = useChat()

  return (
    <ul className="border-2 border-red-500 flex flex-col gap-4 w-full h-full m-auto overflow-auto p-4">
      <TextMessage />
      {JSON.stringify(messages)}
    </ul>
  )
}
