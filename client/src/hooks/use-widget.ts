import { useContext } from 'react'
import { WidgetContext } from '../context'

export const useWidgetContext = () => {
  return useContext(WidgetContext)
}
