import { ChatWindow, ChatButton } from '.'

export const ChatWidget = () => {
  return (
    <div className='flex flex-col items-end fixed md:bottom-5 md:right-10
       w-full h-full md:w-auto md:h-auto border-2 border-red-500'>
      <ChatWindow/>
      <ChatButton/>
    </div>
  )
}
