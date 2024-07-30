import { type FC } from 'react'
import { OptionButton } from '.'

type Props = {
  header?: string
  options: Array<{
    label: string
    redirect: string
  }>
}

export const InteractiveMessage: FC<Props> = ({ header, options }) => {
  return (
    <div className='flex flex-col items-center w-full m-auto bg-c1 rounded-lg shadow-sm border-[1px] border-c6'>
      {header && <p className='text-center p-4 border-b-2 border-c6 w-full'>{header}</p>}
      <div className='p-2 bg-c1 w-full rounded-xl'>
        <ul className='flex flex-col gap-4 max-w-[80%] w-full m-auto py-2'>
          {options.map((option, i) => (
            <OptionButton key={`option-${i}`} {...option} />
          ))}
        </ul>
      </div>
    </div>
  )
}
