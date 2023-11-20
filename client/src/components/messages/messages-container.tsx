import { InteractiveMessage, TextMessage } from '.'
import { useChat } from '../../hooks'

export const MessagesContainer = () => {
  const { messages } = useChat()

  return (
    <ul className="flex flex-col gap-4 w-full h-full m-auto p-4">
      {messages?.map(({ header, body, data, type, side }, i) =>
        type !== 'input'
          ? <li key={`message-${i}`}>
            {/* First message from bot response (should be a header) */}
            {header && <TextMessage side="system" text={header} />}

            {/* The rest of messages ! Supported: text add ({ type }) to check */}
            {body && (
              <>
                {body
                  // ! Check if has options to send the last
                  // ! message with options at the same time
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

            {/* Options to select using buttons  */}
            {data.option && (
              <InteractiveMessage
                options={data.option}
                header={body ? body.at(-1)?.text : undefined}
              />
            )}
          </li>

        // ! Input messages = Simple text message...
          : data.input?.input
            ? <TextMessage
              key={`input-message-${i}`}
              text={data.input?.input}
              side={side}
            />
            : null
      )}
    </ul>
  )
}
