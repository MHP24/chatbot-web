import { Button } from '..'
import { useChat } from '../../hooks'

export const WidgetClosed = () => {
  const { createNewChat } = useChat()

  return (
    <section className="grid place-items-center h-full w-full px-2">
      <div className="flex flex-col gap-10 items-center">
        <p
          className="text-lg m-auto text-center"
        > El chat ha finalizado <br/><span>¡Muchas gracias por tu tiempo!</span> </p>

        <Button fn={createNewChat} cooldown={2000}>
            Iniciar nueva conversaci&oacute;n
        </Button>
      </div>
    </section>
  )
}
