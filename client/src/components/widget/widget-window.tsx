import { ChatHeader, ChatDialog, ChatInput } from '.'
import { useChat, useWidgetContext } from '../../hooks'

export const WidgetWindow = () => {
  const { isOpen, timesOpened } = useWidgetContext()
  const { isClosed, isOnline, chatId } = useChat()

  const animation = isOpen ? 'fadeIn' : 'fadeOut'

  return (
    <div
      className={`flex flex-col 
      ${timesOpened < 1 && 'hidden'} ${animation}
      fixed top-0 left-0 bottom-0 right-0 
      sm:min-w-[25rem] sm:h-[90vh] sm:aspect-[8/16]
      sm:left-auto sm:top-auto sm:right-10 sm:bottom-5
      shadow-2xl rounded-xl z-20`}
    >
      <ChatHeader />
      {
        chatId
          ? isOnline || !isClosed
            ? <>
              <ChatDialog />
              <ChatInput />
            </>

            : <p> {'El chat se ha cerrado, para interactuar vuelve a abrir la pestañá'} </p>
          : <p>loading</p>

      }
    </div>
  )
}
