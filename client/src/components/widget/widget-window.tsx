import { ChatHeader, ChatDialog, ChatInput, WidgetLoader, WidgetClosed } from '.'
import { useChat, useWidget } from '../../hooks'

export const WidgetWindow = () => {
  const { isOpen, timesOpened } = useWidget()
  const { isClosed, isOnline } = useChat()

  const animation = isOpen ? 'fadeIn' : 'fadeOut'

  return (
    <div
      className={`flex flex-col 
      ${timesOpened < 1 && 'hidden'} ${animation}
      fixed top-0 left-0 bottom-0 right-0 
      sm:min-w-[25rem] sm:h-[90vh] sm:aspect-[8/16]
      sm:left-auto sm:top-auto sm:right-10 sm:bottom-5
      shadow-2xl sm:rounded-xl z-20 bg-c1 text-c5 border-[1px] border-c6`}
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
