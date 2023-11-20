/*
  TODO: side-color, side-border, side-background
*/

import { type FC } from 'react'

type Props = {
  side: string
  text: string
}

export const TextMessage: FC<Props> = ({ side, text }) => {
  const styles = side !== 'client' ? 'bg-c1' : 'bg-c4 text-c1'

  return (
    <div>
      <p className={
        `${styles} text-md w-fit max-w-[85%] py-2 px-4 rounded-xl rounded-tl-none shadow-sm`
      }>
        {text}
      </p>
    </div>
  )
}
