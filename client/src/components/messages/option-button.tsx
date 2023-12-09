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
      className='bg-c2 hover:opacity-80 hover:bg-c2 rounded-xl
        w-full m-auto py-2 p-1 text-c5 border-[1px] border-c6'
    >
      {label}
    </button>
  )
}
