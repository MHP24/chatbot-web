export type MessageSide = 'system' | 'client'

export type BotMessageType =
  | 'input'
  | 'option'

export type Image = {
  type: 'image'
  image: string
  caption: string
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

export type BotBodyMessage = Image | Text | Video | Audio

export type BotMessage = {
  side: 'system'
  type: BotMessageType
  header: string
  body: BotBodyMessage[]
  data: Menu
  timestamp?: number
}

export type Menu = Option | Input

export type Option = {
  option: Array<{
    label: string
    redirect: string
  }>
}

export type Input = {
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
  side: 'client'
  origin: 'option' | 'input'
  message: string
  timestamp?: number
}

export type Message = BotMessage | ClientMessage
