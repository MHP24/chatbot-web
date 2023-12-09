import { InteractiveMessage, TextMessage } from '.'
import { useChat } from '../../hooks'
import { type Option } from '../../types'

export const MessagesContainer = () => {
  const { messages } = useChat()
  return (
    <ul className="flex flex-col gap-6 w-full h-full m-auto p-4">
      {
        messages.map((message, i) => (
          <li key={`message-${i}`}>
            {/* For client messages only */}
            {
              message.side === 'client' && (
                <TextMessage
                  side={message.side}
                  text={message.message}
                  timestamp={message.timestamp}
                />
              )
            }

            {/* For system messages */}
            {/* Text messages header content */}
            {
              message.side === 'system' && message.header &&
                (
                  <TextMessage
                    side={message.side}
                    text={message.header}
                    timestamp={message.timestamp}
                  />
                )
            }

            {/* Body from system message */}
            {
              message.side === 'system' && message.body && (
                <div className='my-4'>
                  {message.body
                    .slice(0, message.type === 'option' ? -1 : message.body.length)
                    .map(
                      ({ text }, j) =>
                        text && (
                          <TextMessage
                            key={`message-${i}-${j}`}
                            side={message.side}
                            text={text}
                            timestamp={message.timestamp}
                          />
                        )
                    )}
                </div>
              )
            }

            {/* Option messages (buttons) */}
            {
              message.side === 'system' &&
              message.type === 'option' &&
              (
                <InteractiveMessage
                  options={(message.data as Option).option}
                  header={message.body ? message.body.at(-1)?.text : undefined}
                />
              )
            }

          </li>
        ))
      }
    </ul>
  )
}
