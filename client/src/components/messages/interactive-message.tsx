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
    <div className="flex flex-col items-center w-full  m-auto mt-6 bg-c1 p-2 rounded-xl shadow-sm">
      {header && <p className="text-center p-2 border-b-2 border-c2 w-full">{header}</p>}
      <div className="p-2 bg-c1 w-full max-w-[75%] rounded-xl">
        <ul className="flex flex-col gap-3">
          {options.map((option, i) => (
            <OptionButton key={`option-${i}`} {...option} />
          ))}
        </ul>
      </div>
    </div>
  )
}
