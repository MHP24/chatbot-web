import { ChatDialog, ChatHeader, ChatInput } from '.'

export const ChatWindow = () => {
  return (
    <div className="md:h-[80vh] md:max-h-[54rem] md:aspect-[10/16]
      border-2 border-blue-500"
    >
      <ChatHeader/>
      <ChatDialog/>
      <ChatInput/>
    </div>
  )
}
