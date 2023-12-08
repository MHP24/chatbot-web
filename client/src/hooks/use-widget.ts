import { useContext } from 'react'
import { WidgetContext } from '../context'

export const useWidget = () => {
  return useContext(WidgetContext)
}
