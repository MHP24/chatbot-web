import { type FC } from 'react'

type Props = {
  label: string
  redirect: string
}

export const OptionButton: FC<Props> = ({ label, redirect }) => {
  const onClick = () => {
    console.log({ redirect })
  }

  return (
    <button
      onClick={onClick}
      className='border-2 border-c4 bg-c1 hover:bg-c2 transition-all delay-75
        w-full max-w-[70%] m-auto p-2 text-c4 font-bold rounded-full'
    >
      {label}
    </button>
  )
}
