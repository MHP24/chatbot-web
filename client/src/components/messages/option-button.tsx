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
      className='border-t-2 border-c2 bg-c2 hover:bg-c4 hover:text-c2 rounded-lg transition-all delay-75
        w-full m-auto p-2 text-c4 font-semibold'
    >
      {label}
    </button>
  )
}
