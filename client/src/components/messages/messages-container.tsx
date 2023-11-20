import { OptionMessage } from '.'
import { useChat } from '../../hooks'

export const MessagesContainer = () => {
  const { messages } = useChat()

  console.log({ messages })

  return (
    <ul className="flex flex-col gap-4 w-full h-full m-auto p-4">
      {
        messages.map((message, i) =>
          message.type === 'option' && (
            <OptionMessage
              key={`option-message-${i}`}
              options={message.data[message.type]}
              {...message}
            />
          )

        )
      }

    </ul>
  )
}
