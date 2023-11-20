import { type FC } from 'react'
import { OptionButton, TextMessage } from '.'

type Props = {
  header?: string
  options: Array<{
    label: string
    redirect: string
  }>
}

export const InteractiveMessage: FC<Props> = ({ header, options }) => {
  return (
    <div className="flex flex-col gap-6">
      {header && <TextMessage side={'system'} text={header} />}
      <div className="p-2 bg-c1 w-full max-w-[75%] rounded-xl shadow-sm ">
        <ul className="flex flex-col">
          {options.map((option, i) => (
            <OptionButton key={`option-${i}`} {...option} />
          ))}
        </ul>
      </div>
    </div>
  )
}
