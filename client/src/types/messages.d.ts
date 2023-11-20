export type MessageType = 'input' | 'option' | 'close' | 'action'
export type MessageSide = 'system' | 'client'

export type BodyElement = {
  type: string
  text?: string
  image?: string
  caption?: string
}

export type Option = {
  label: string
  redirect: string
}

export type Input = {
  detail: string
}

export type OnInputValid = {
  redirect: string
}

export type Message = {
  side: MessageSide
  type: MessageType
  header?: string
  body?: BodyElement[]
  data: {
    option?: Option[]
    input?: Input
  }
  // Interactions
  hasToClose?: boolean
}
