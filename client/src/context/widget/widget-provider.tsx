import { useReducer, type FC, type PropsWithChildren } from 'react'
import { WidgetContext, widgetReducer } from '.'
import { type WidgetT } from '../../types'

const INITIAL_STATE: WidgetT = {
  isOpen: false,
  timesOpened: 0
}

export const WidgetProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(widgetReducer, INITIAL_STATE)

  // * Toggler for widget visualization
  const handleWidget = (arg: boolean) => {
    dispatch({ type: '[Widget] - Handle', payload: arg })
  }
  return (
    <WidgetContext.Provider value={{ ...state, handleWidget }}>
      {children}
    </WidgetContext.Provider>
  )
}
