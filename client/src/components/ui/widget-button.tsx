import { useWidgetContext } from '../../hooks'
import chatLogo from '../../assets/svgs/chat.svg'

export const WidgetButton = () => {
  const { handleWidget } = useWidgetContext()

  return (
    <button className="fixed grid items-center bottom-9 right-14
      hover:scale-110 hover:rotate-12 duration-75
     aspect-square p-3 rounded-full bg-c4 select-none z-10"
    onClick={() => { handleWidget(true) }}
    >
      <img src={chatLogo}/>
    </button>
  )
}
