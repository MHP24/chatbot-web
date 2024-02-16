import { useChat, useWidget } from '../../hooks'
import chatLogo from '../../assets/svgs/chat.svg'

export const WidgetButton = () => {
  const { handleWidget, isOpen } = useWidget()
  const { establishConnection } = useChat()
  const animation = !isOpen ? 'fadeIn__light' : 'fadeOut__light'

  const onClick = async () => {
    handleWidget(true)
    await establishConnection()
  }

  return (
    <button className={`fixed grid items-center bottom-9 right-14
      hover:scale-110 hover:rotate-12 duration-75
     aspect-square p-3 rounded-full bg-c4 select-none ${animation} z-10`}
    onClick={onClick}
    name='open chat'
    aria-label='open chat'
    >
      <img src={chatLogo} alt='open chat'/>
    </button>
  )
}
