export const ChatInput = () => {
  return (
    <form className="h-[17%] bg-c2 rounded-br-lg rounded-bl-lg">
      <div className=''>
        <input
          type="text"
          autoComplete="off"
          placeholder="Escribe tu mensaje"

          className="border-2 w-full focus:outline-none
            p-3 text-md placeholder:opacity-60"
        />
      </div>

      <small className="block text-center m-auto w-full py-2">
        Powered by
        <strong className="text-c4">
          &nbsp;Miguel HP
        </strong>
      </small>
    </form>
  )
}
