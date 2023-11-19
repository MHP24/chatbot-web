export type MessageSide = 'user' | 'bot' | 'agent'

export type Message<T> = {
  side: MessageSide
  time: number
  data: T
}

export type TextMessage = {
  text: string
}

export type ImageMessage = {
  image: string
  caption: string
}

export type OptionMessage = {
  option: Array<{
    label: string
    redirect: string
  }>
}
