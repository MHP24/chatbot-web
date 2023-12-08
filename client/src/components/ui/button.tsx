import { useState, type FC, type PropsWithChildren } from 'react'

type Props = {
  fn?: () => void
  cooldown?: number
}

export const Button: FC<PropsWithChildren<Props>> = ({ children, fn, cooldown }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    if (!isLoading) {
      fn && fn()
      if (cooldown && cooldown > 0) {
        setIsLoading(true)

        setTimeout(() => {
          setIsLoading(false)
        }, cooldown)
      }
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className='bg-c4 py-2 px-6 rounded-full text-c1 font-semibold text-md
        hover:bg-c4-hover w-sm disabled:bg-c4-hover'
    >
      { isLoading ? <p className='animate-bounce'>...</p> : children }
    </button>
  )
}
