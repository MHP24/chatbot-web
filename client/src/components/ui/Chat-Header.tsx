import botIllustration from '../../assets/svgs/bot.svg'
import closeOption from '../../assets/svgs/close.svg'
// import agentIllustration from "../../assets/svgs/agent.svg"

export const ChatHeader = () => {
  return (
    <header className="flex h-[20%] w-full px-6 py-3 pr-3 bg-c1 rounded-tr-lg rounded-tl-lg">

      <div className="flex items-center h-full w-full gap-5">
        <div className="flex relative bg-c4 w-16 rounded-full aspect-square p-3">
          <img src={botIllustration} className="m-auto w-full h-full"/>

          {/* Status indicator */}
          <div className=' absolute w-3 h-3 bottom-0 mx-auto
            rounded-full  bg-online border-2 border-c1'
          >
          </div>
        </div>

        <div>
          {/* Flow level */}
          <h1 className="text-2xl font-semibold">ChatBot</h1>

          {/* Status label */}
          <p className="text-md">En linea</p>
        </div>
      </div>

      {/* Actions (Close, reload) */}
      <div className='flex items-start gap-4'>
        <button className='h-25 w-25'>
          <img src={closeOption} className='h-full w-full'/>
        </button>
      </div>

    </header>
  )
}
