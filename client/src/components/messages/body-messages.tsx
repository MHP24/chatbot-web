import { type FC } from 'react'
import { type BotMessage } from '../../types'
import { BodyMessage } from '.'

type Props = {
  message: BotMessage
  i: number
}

export const BodyMessages: FC<Props> = ({ message, i }) => {
  const { body, timestamp } = message
  if (!(body && body.length > 0)) return null

  return (
    <div className="my-2 flex flex-col gap-2">
      {body.map((bodyMessage, j) => {
        if (
          message.type === 'option' &&
          j === body.length - 1 &&
          bodyMessage.type === 'text'
        ) {
          return null
        }

        return (
          <BodyMessage
            key={`message-${i}-${j}`}
            timestamp={timestamp}
            bodyMessage={bodyMessage}
          />
        )
      })}
    </div>
  )
}
