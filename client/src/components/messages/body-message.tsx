import { type FC } from 'react'
import { type BotBodyMessage } from '../../types'
import { TextMessage, ImageMessage } from '.'

type Props = {
  bodyMessage: BotBodyMessage
  timestamp?: number
}

export const BodyMessage: FC<Props> = ({ bodyMessage, timestamp }) => {
  switch (bodyMessage.type) {
    case 'text':
      return (
        <TextMessage
          {...bodyMessage}
          side='system'
          timestamp={timestamp}
        />
      )
    case 'image':
      return (
        <ImageMessage
          {...(bodyMessage)}
          timestamp={timestamp}
        />
      )
    default:
      return null
  }
}
