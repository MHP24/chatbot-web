import { type FC } from 'react'

type Props = {
  side: string
  text: string
  timestamp?: number
}

export const TextMessage: FC<Props> = ({ side, text, timestamp }) => {
  const isClient = side === 'client'
  const styles = isClient
    ? 'bg-c4 text-c1 ml-0 rounded-tr-none'
    : 'bg-c1 mr-0 rounded-tl-none'
  const containerStyles = isClient ? 'justify-end' : 'justify-start'

  const date = new Date(timestamp ?? 0)

  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  const time = `${hours}:${minutes}`

  return (
    <div className={` flex ${containerStyles}`}>
      <div
        className={`flex items-end gap-2 rounded-xl text-md w-fit max-w-[90%] py-2 px-6 shadow-sm ${styles}`}
      >
        {
          !isClient
            ? <div className="text-md" dangerouslySetInnerHTML={{ __html: text }}></div>
            : <p className="text-md">{text}</p>

        }
        {timestamp && <small className="text-[.7rem] text-end opacity-50">{time}</small>}
      </div>
    </div>
  )
}
