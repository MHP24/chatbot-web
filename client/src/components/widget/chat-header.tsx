import agentIllustration from '../../assets/agent.webp'
import closeOption from '../../assets/svgs/close.svg'
import { useWidget } from '../../hooks'

export const ChatHeader = () => {
  const { handleWidget } = useWidget()

  return (
    <section className="flex h-[20%] w-full px-6 py-3 pr-3 bg-c1
      rounded-tr-xl rounded-tl-xl shadow-2xl border-b-2 border-c6"
    >

      <div className="flex items-center h-full w-full gap-5">
        <div className="flex relative bg-c4 w-16 rounded-full aspect-square shadow-xl border-2 border-c6">
          <img src={agentIllustration} className="m-auto w-full h-full rounded-full" alt='agent-logo'/>

          {/* Status indicator */}
          <div className='absolute w-3 h-3 bottom-0 right-0 mx-auto
            rounded-full  bg-online border-2 border-c1'
          >
          </div>
        </div>

        <div>
          {/* Flow level */}
          <h1 className="text-2xl font-semibold">Asistente virtual</h1>

          {/* Status label */}
          <p className="text-md opacity-50">En l&iacute;nea</p>
        </div>
      </div>

      {/* Actions (Close, reload) */}
      <div className='flex items-start gap-4'>
        <button className='h-25 w-25' onClick={() => { handleWidget(false) }}>
          <img src={closeOption} className='h-full w-full'/>
        </button>
      </div>

    </section>
  )
}
