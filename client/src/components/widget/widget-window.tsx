import { WidgetLoader, WidgetClosed } from '.'
import { useChat, useWidget } from '../../hooks'
import { cn } from '../../utils'
import { ChatHeader, ChatDialog, ChatInput } from '../chat'

export const WidgetWindow = () => {
  const { isOpen, timesOpened } = useWidget()
  const { isClosed, isOnline } = useChat()

  return (
    <div
      className={cn(
        'flex flex-col fixed top-0 left-0 bottom-0 right-0 sm:bottom-5 sm:right-10 sm:left-auto sm:top-auto sm:w-[23rem] sm:h-[40rem] shadow-2xl sm:rounded-xl z-20 bg-c1 text-c5 border-[1px] border-c6',
        timesOpened < 1 ? 'hidden' : '',
        isOpen ? 'fadeIn' : 'fadeOut'
      )}
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
