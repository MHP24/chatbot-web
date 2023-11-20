import { type FC } from 'react'
import { OptionButton, TextMessage } from '.'

type Props = {
  header?: string
  body?: Array<{
    text: string
  }>
  options: Array<{
    label: string
    redirect: string
  }>
}

export const OptionMessage: FC<Props> = ({ header, body, options }) => {
  return (
    <div className="flex flex-col gap-6">
      {header && <TextMessage side={'system'} text={header} />}
      {body?.map(
        ({ text }, i) =>
          text.length && (
            <TextMessage
              key={`key-text-message-${i}`}
              side={'system'}
              text={text}
            />
          )
      )}
      <ul className="flex flex-col w-full gap-3">
        {options.map((option, i) => (
          <OptionButton key={`option-${i}`} {...option} />
        ))}
      </ul>
    </div>
  )
}
