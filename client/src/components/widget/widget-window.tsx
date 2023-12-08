import { ChatHeader, ChatDialog, ChatInput, WidgetLoader, WidgetClosed } from '.'
import { useChat, useWidgetContext } from '../../hooks'

export const WidgetWindow = () => {
  const { isOpen, timesOpened } = useWidgetContext()
  const { isClosed, isOnline } = useChat()

  const animation = isOpen ? 'fadeIn' : 'fadeOut'

  return (
    <div
      className={`flex flex-col 
      ${timesOpened < 1 && 'hidden'} ${animation}
      fixed top-0 left-0 bottom-0 right-0 
      sm:min-w-[25rem] sm:h-[90vh] sm:aspect-[8/16]
      sm:left-auto sm:top-auto sm:right-10 sm:bottom-5
      shadow-2xl rounded-xl z-20 border-2 border-c2`}
    >

      {

        isOnline
          ? <>
            <ChatHeader />
            <ChatDialog />
            <ChatInput />
          </>
          : isClosed
            ? <WidgetClosed/>
            : <WidgetLoader/>

      }
    </div>
  )
}
