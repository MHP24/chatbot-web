import { useChat, useWidget } from '../../hooks'
import { cn } from '../../utils'
import chatLogo from '../../assets/svgs/chat.svg'

export const WidgetButton = () => {
  const { handleWidget, isOpen } = useWidget()
  const { establishConnection } = useChat()
  const onClick = async () => {
    handleWidget(true)
    await establishConnection()
  }

  return (
    <button className={cn(
      'fixed grid items-center bottom-9 right-14 hover:scale-110 hover:rotate-12 duration-75 aspect-square p-3 rounded-full bg-c4 select-none z-10',
      !isOpen ? 'fadeIn__light' : 'fadeOut__light'
    )}
    onClick={onClick}
    name='open chat'
    aria-label='open chat'
    >
      <img src={chatLogo} alt='open chat' className='w-8 h-8'/>
    </button>
  )
}
