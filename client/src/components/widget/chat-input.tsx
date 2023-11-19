import { type FormEvent, useRef } from 'react'
import { useChat } from '../../hooks'

export const ChatInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { sendMessage } = useChat()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const message = `${inputRef.current?.value}`.trim()
    if (message.length === 0) return
    sendMessage('option', message)
  }

  return (
    <form
      className="h-[17%] bg-c2 rounded-br-xl rounded-bl-xl"
      onSubmit={onSubmit}
    >
      <div className="">
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          placeholder="Escribe tu mensaje"
          className="border-2 w-full focus:outline-none
            p-3 text-md placeholder:opacity-60"
        />
      </div>

      <small className="block text-center m-auto w-full py-2">
        Powered by
        <strong className="text-c4">&nbsp;Miguel HP</strong>
      </small>
    </form>
  )
}
