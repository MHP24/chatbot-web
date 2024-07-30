import { type FC } from 'react'
import { BodyMessages, InteractiveMessage, TextMessage } from '.'
import { type Text, type Option, type Message } from '../../types'
import agent from '../../assets/agent.webp'
import customer from '../../assets/customer.webp'

interface Props {
  messages: Message[]
}

export const MessagesContainer: FC<Props> = ({ messages }) => {
  return (
    <ul className='flex flex-col gap-2 w-full h-full m-auto px-6 text-sm'>
      {
        messages.map((message, i) => (
          <li key={`message-${i}`}>

            {
              message.side === 'client' && (
                <div className='flex flex-col items-end w-full'>
                  <div className='flex items-center gap-2 mb-1'>
                    <p className='text-xs font-semibold'>T&uacute;</p>
                    <img src={customer} alt='cliente' className='w-6 h-6 rounded-full' />
                  </div>
                  <TextMessage
                    side={message.side}
                    text={message.message}
                    timestamp={message.timestamp}
                  />
                </div>
              )
            }

            {
              message.side === 'system' && (
                <>
                  <div className='flex flex-col items-start gap-2'>
                    <div className='flex items-center gap-2 mb-1'>
                      <img src={agent} alt='asistente' className='w-6 h-6 rounded-full' />
                      <p className='text-xs font-semibold'>Asistente</p>
                    </div>
                    <TextMessage
                      side={message.side}
                      text={message.header}
                      timestamp={message.timestamp}
                    />
                  </div>

                  {<BodyMessages message={message} i={i}/>}

                  {message.type === 'option' && (
                    <InteractiveMessage
                      options={(message.data as Option).option}
                      header={
                        message.body &&
                        message.body.slice(-1)?.[0]?.type === 'text'
                          ? (message.body.slice(-1)?.[0] as Text).text
                          : undefined
                      }
                    />
                  )}
                </>
              )
            }

          </li>
        ))
      }
    </ul>
  )
}
