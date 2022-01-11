import { produce } from 'immer'

import { TableRaport } from '../../globalTypes'

export interface Navigation {
  page: number
  first: number
  endCursor: string
  hasNext: boolean
}

export interface RaportsState {
  raports: TableRaport[]
  navigation: Navigation
}

export interface RaportsAction extends Partial<RaportsState> {
  type: 'TOGGLE_RAPORT' | 'SELECT_ALL' | 'UNSELECT_ALL' | 'SET_RAPORTS' | 'SET_NAVIGATION'
  id?: number
}

export const initialRaports: RaportsState = {
  raports: [],
  navigation: {
    page: 0,
    first: 10,
    hasNext: true,
    endCursor: ''
  }
}

export const raportsReducer = (state: RaportsState, action: RaportsAction) => {
  switch (action.type) {
    case 'TOGGLE_RAPORT':
      return produce(state, draft => {
        if (!action.id) return state
        const toSelectRaport = draft.raports.find(raport => raport.id === action.id)
        if (toSelectRaport) toSelectRaport.isSelected = !toSelectRaport.isSelected
      })
    case 'SELECT_ALL':
      return produce(state, draft => {
        draft.raports.forEach(raport => raport.isSelected = true)
      })
    case 'UNSELECT_ALL':
      return produce(state, draft => {
        draft.raports.forEach(raport => raport.isSelected = false)
      })
    case 'SET_RAPORTS':
      return produce(state, draft => {
        draft.raports = action.raports || state.raports
      })
    case 'SET_NAVIGATION':
      return produce(state, draft => {
        draft.navigation = action.navigation || state.navigation
      })
    default:
      return state
  }
}
