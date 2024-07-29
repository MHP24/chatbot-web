import { type FormEvent, useRef } from 'react'
import { useChat } from '../../hooks'
import sendLogo from '../../assets/svgs/send.svg'

export const ChatInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { sendInputMessage } = useChat()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputRef.current) {
      const message = inputRef.current.value.trim()
      if (message.length === 0) return

      sendInputMessage(message)
      inputRef.current.value = ''
    }
  }

  return (
    <form
      className='h-[17%] bg-c2 rounded-br-xl rounded-bl-xl'
      onSubmit={onSubmit}
    >
      <div className='flex gap-0 w-full bg-c1 border-t-2 border-b-2 border-c2'>
        <input
          ref={inputRef}
          type='text'
          autoComplete='off'
          placeholder='Escribe tu mensaje'
          className='w-full focus:outline-none bg-c1
            p-3 text-sm placeholder:opacity-60'
        />
        <button type='submit' className='w-12 p-2'>
          <img src={sendLogo} className='w-10 h-10 aspect-square' alt='send'/>
        </button>
      </div>

      <a href='https://mg-hp.com' target='_blank' rel='noreferrer'>
        <small className='block text-center m-auto w-full py-2'>
        Powered by
          <strong className='text-c5 text-xs'>&nbsp;Miguel HP</strong>
        </small>
      </a>
    </form>
  )
}
