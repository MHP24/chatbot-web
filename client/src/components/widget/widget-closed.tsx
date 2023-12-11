import { Button } from '..'
import { useChat, useWidget } from '../../hooks'
import arrowDown from '../../assets/svgs/arrow-down.svg'

export const WidgetClosed = () => {
  const { createNewChat, closeReason } = useChat()
  const { handleWidget } = useWidget()

  return (
    <section className="grid place-items-center h-full w-full px-2 relative">
      <button className='h-25 w-25 absolute top-2 right-2'
        onClick={() => { handleWidget(false) }}
      >
        <img src={arrowDown} className='h-full w-full'/>
      </button>
      <div className="flex flex-col gap-10 items-center">
        <p
          className="text-lg m-auto text-center"
        >  {closeReason ?? 'El chat ha finalizado'} <br/><br/>
          <span>¡Muchas gracias por tu tiempo!</span>
        </p>

        <Button fn={createNewChat} cooldown={2000}>
            Iniciar nueva conversaci&oacute;n
        </Button>
      </div>
    </section>
  )
}
