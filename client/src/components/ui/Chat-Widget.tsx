import { ChatWindow, ChatButton } from '.'

export const ChatWidget = () => {
  return (
    <div className='flex flex-col items-end fixed sm:bottom-5 sm:right-10
       w-full h-full sm:w-auto sm:h-auto text-c3'>
      <ChatWindow/>
      <ChatButton/>
    </div>
  )
}
