export type MessageSide = 'system' | 'client'

export type BotMessageType =
  | 'input'
  | 'option'

export type Image = {
  type: 'image'
  image: string
}
export type Text = {
  type: 'text'
  text: string
}
export type Video = {
  type: 'video'
  video: string
}
export type Audio = {
  type: 'audio'
  audio: string
}

export type BotMessage = {
  header: string
  body: BotBodyMessage[]
  data: Menu
}

export type Menu = Option | Input

export type Option = {
  type: 'option'
  option: Array<{
    label: string
    redirect: string
  }>
}

export type Input = {
  type: 'input'
  input: {
    regex: null | string
    errorMessage: string
    reference: string
    onValid: {
      redirect: string
    }
  }
}

export type ClientMessage = {
  origin: 'option' | 'input'
  message: string
}

export type Message = {
  side: MessageSide
  message: BotMessage | ClientMessage
  timestamp: number
}
