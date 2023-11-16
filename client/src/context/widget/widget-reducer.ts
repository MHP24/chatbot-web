import { type WidgetT } from '../../types'

type Action = {
  type: '[Widget] - Handle'
  payload: boolean
}

export const widgetReducer = (state: WidgetT, action: Action): WidgetT => {
  switch (action.type) {
    case '[Widget] - Handle':
      return {
        ...state,
        isOpen: action.payload,
        timesOpened: state.timesOpened + Number(action.payload)
      }
  }
}
