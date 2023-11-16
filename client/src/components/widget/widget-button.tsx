import { useWidgetContext } from '../../hooks'
import chatLogo from '../../assets/svgs/chat.svg'

export const WidgetButton = () => {
  const { handleWidget, isOpen } = useWidgetContext()
  const animation = !isOpen ? 'fadeIn' : 'fadeOut'

  return (
    <button className={`fixed grid items-center bottom-9 right-14
      hover:scale-110 hover:rotate-12 duration-75
     aspect-square p-3 rounded-full bg-c4 select-none ${animation} z-10`}
    onClick={() => { handleWidget(true) }}
    >
      <img src={chatLogo}/>
    </button>
  )
}
