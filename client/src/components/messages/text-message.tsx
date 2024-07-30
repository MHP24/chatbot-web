import { type FC } from 'react'
import { cn, formatTimestamp } from '../../utils'

type Props = {
  side: string
  text: string
  timestamp?: number
}

export const TextMessage: FC<Props> = ({ side, text, timestamp }) => {
  const isClient = side === 'client'

  return (
    <div className={cn('flex max-w-[90%]', isClient ? 'justify-end' : 'justify-start', 'mb-2')}>
      <div
        className={cn('flex flex-col items-end gap-1 rounded-lg w-fit py-2 px-3 shadow-sm border-[1px] border-c6',
          isClient
            ? 'bg-c4 text-c1 ml-0 rounded-tr-none'
            : 'bg-c1 mr-0 rounded-tl-none'
        )}
      >
        {
          !isClient
            ? <div className='text-md' dangerouslySetInnerHTML={{ __html: text }}></div>
            : <p className='text-md text-c5'>{text}</p>
        }
        {timestamp && (
          <small className='text-[.7rem] text-end opacity-50 text-c5'>
            {formatTimestamp(timestamp)}
          </small>
        )}
      </div>
    </div>
  )
}
