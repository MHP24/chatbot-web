import { type FC } from 'react'
import { useChat } from '../../hooks'

type Props = {
  label: string
  redirect: string
}

export const OptionButton: FC<Props> = ({ label, redirect }) => {
  const { sendOptionMessage } = useChat()

  const onClick = () => {
    sendOptionMessage(label, redirect)
  }

  return (
    <button
      onClick={onClick}
      className='bg-c2 hover:opacity-80 hover:bg-c2 rounded-full
        w-full m-auto p-2 text-c5 border-2 border-c4'
    >
      {label}
    </button>
  )
}
