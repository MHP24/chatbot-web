import { InteractiveMessage, TextMessage } from '.'
import { useChat } from '../../hooks'

export const MessagesContainer = () => {
  const { messages } = useChat()

  return (
    <ul className="flex flex-col gap-4 w-full h-full m-auto p-4">
      {messages?.map(({ header, body, data, side }, i) => (
        <li key={`message-${i}`}>
          {/*  */}
          {header && <TextMessage side={side} text={header} />}

          {/*  */}
          {body && (
            <>
              {body
                .slice(0, data.option ? -1 : body.length)
                .map(
                  ({ text }, j) =>
                    text && (
                      <TextMessage
                        key={`message-${i}-${j}`}
                        side={side}
                        text={text}
                      />
                    )
                )}
            </>
          )}

          {/*  */}
          {data.option && (
            <InteractiveMessage
              options={data.option}
              header={body ? body.at(-1)?.text : undefined}
            />
          )}

          {/*  */}
          {data.input?.detail && (
            <TextMessage
              key={`input-message-${i}`}
              text={data.input?.detail}
              side={side}
            />
          )}
        </li>
      ))}
    </ul>
  )
}
