import { type FC } from 'react'
import { BodyMessages, InteractiveMessage, TextMessage } from '.'
import { type Text, type Option, type Message } from '../../types'

interface Props {
  messages: Message[]
}

export const MessagesContainer: FC<Props> = ({ messages }) => {
  return (
    <ul className="flex flex-col gap-6 w-full h-full m-auto p-4">
      {
        messages.map((message, i) => (
          <li key={`message-${i}`}>

            {
              message.side === 'client' && (
                <TextMessage
                  side={message.side}
                  text={message.message}
                  timestamp={message.timestamp}
                />
              )
            }

            {
              message.side === 'system' && (
                <>
                  <TextMessage
                    side={message.side}
                    text={message.header}
                    timestamp={message.timestamp}
                  />

                  {<BodyMessages message={message} i={i}/>}

                  {message.type === 'option' && (
                    <InteractiveMessage
                      options={(message.data as Option).option}
                      header={
                        message.body &&
                        message.body.slice(-1)?.[0]?.type === 'text'
                          ? (message.body.slice(-1)?.[0] as Text).text
                          : undefined
                      }
                    />
                  )}
                </>
              )
            }

          </li>
        ))
      }
    </ul>
  )
}
