import { InteractiveMessage, TextMessage } from '.'
import { useChat } from '../../hooks'

export const MessagesContainer = () => {
  const { messages } = useChat()

  // TODO: separate messages by type

  return (
    <ul className="flex flex-col gap-4 w-full h-full m-auto p-4">
      {messages?.map(({ header, body, data, type }, i) => (
        type !== 'input'
          ? <li key={`message-${i}`}>
            {header && <TextMessage side="system" text={header} />}

            {body && (
              <>
                {body
                // ! Check if has options to send the last message with options at the same time
                  .slice(0, data.option ? -1 : body.length)
                  .map(
                    ({ text }, j) =>
                      text && (
                        <TextMessage
                          key={`message-${i}-${j}`}
                          side="system"
                          text={text}
                        />
                      )
                  )}
              </>
            )}

            {data.option && (
              <InteractiveMessage
                options={data.option}
                header={body ? body.at(-1)?.text : undefined}
              />
            )}
          </li>

          : data.input?.input ? <TextMessage key={`input-message-${i}`} text={data.input?.input} side='system'/> : null
      ))}
    </ul>
  )
}
