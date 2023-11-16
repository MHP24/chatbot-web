import { ChatHeader, ChatDialog, ChatInput } from '.'
import { useWidgetContext } from '../../hooks'

export const Window = () => {
  const { isOpen } = useWidgetContext()

  const animation = isOpen ? 'fadeIn' : 'fadeOut'

  return (
    <div className={`flex flex-col 
      fixed top-0 left-0 bottom-0 right-0 
      sm:min-w-[25rem] sm:h-[80vh] sm:aspect-[10/16]
      sm:left-auto sm:top-auto sm:right-10 sm:bottom-5
      ${animation} z-20`
    }>
      <ChatHeader/>
      <ChatDialog/>
      <ChatInput/>
    </div>
  )
}
