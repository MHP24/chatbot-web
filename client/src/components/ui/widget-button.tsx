import { useWidgetContext } from '../../hooks'

export const WidgetButton = () => {
  const { handleWidget } = useWidgetContext()

  return (
    <button className="fixed grid items-center bottom-5 right-10
     aspect-square p-3 rounded-full bg-c4 z-10"
    onClick={() => { handleWidget(true) }}
    >
      Chat
    </button>
  )
}
