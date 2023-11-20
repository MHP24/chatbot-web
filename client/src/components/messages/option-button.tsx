import { type FC } from 'react'
import { useChat } from '../../hooks'

type Props = {
  label: string
  redirect: string
}

export const OptionButton: FC<Props> = ({ label, redirect }) => {
  const { sendOption } = useChat()

  const onClick = () => {
    sendOption(label, redirect)
  }

  return (
    <button
      onClick={onClick}
      className='border-t-2 border-c2 bg-c1 hover:bg-c2 transition-all delay-75
        w-full m-auto p-2 text-c4 font-semibold'
    >
      {label}
    </button>
  )
}
