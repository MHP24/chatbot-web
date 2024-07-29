export type WidgetT = {
  isOpen: boolean
  timesOpened: number
}

export type WidgetProviderT = {
  handleWidget: (arg: boolean) => void
} & WidgetT
