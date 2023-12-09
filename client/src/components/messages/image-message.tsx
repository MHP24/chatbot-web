import { type FC } from 'react'
import { formatTimestamp } from '../../utils'

type Props = {
  image: string
  caption: string
  timestamp?: number
}

export const ImageMessage: FC<Props> = ({ image, caption, timestamp }) => {
  return (
    <div
      className='flex flex-col gap-2 rounded-xl text-md w-full py-4 px-6 shadow-sm
       bg-c1 mr-0 rounded-tl-none border-[1px] border-c6'
    >
      <img src={image} alt="chat-image" className='w-full  m-auto rounded-lg border-[1px] border-c6'/>
      <hr className='my-2 opacity-25'/>
      {caption.length > 0 && <div className="text-md" dangerouslySetInnerHTML={{ __html: caption }}></div>}
      {timestamp && <small className="text-[.7rem] text-end opacity-50">{formatTimestamp(timestamp)}</small>}
    </div>
  )
}
