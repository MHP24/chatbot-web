import { ChatDialog, ChatHeader, ChatInput } from '.'

export const ChatWindow = () => {
  return (
    <div className="flex flex-col h-full w-full sm:h-[80vh] sm:max-h-[54rem] sm:aspect-[10/16]">
      <ChatHeader/>
      <ChatDialog/>
      <ChatInput/>
    </div>
  )
}
