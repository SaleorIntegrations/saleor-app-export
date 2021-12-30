import { sortAlphabetically } from '../../../utils/sortAlphabetically'

export interface Filter {
  filterType: 'attribute' | 'category' | 'release' | 'price' | 'channel'
  id: string
  name: string
  checked: boolean
  selected: string[]
}

export interface ReducerAction extends Partial<Filter> {
  type: 'CHANGE_FILTER' | 'SET_FILTERS' | 'CLEAR' | 'ADD_SELECTED'
  filters?: Filter[]
  filter?: Filter
}

export const reducer = (state: Filter[], action: ReducerAction) => {
  switch (action.type) {
    case 'SET_FILTERS':
      if (!action.filters) return state
      return action.filters.sort((a, b) => sortAlphabetically(a.name, b.name))
    case 'CHANGE_FILTER':
      if (!action.filter) throw new Error('Error: add filter to the dispatch')
      return [
        ...state.filter(({ id }) => id !== action.filter?.id),
        action.filter,
      ].sort((a, b) => sortAlphabetically(a.name, b.name))
    case 'CLEAR':
      return state.map(filter => ({
        ...filter,
        checked: false,
        selected: [],
      }))
    case 'ADD_SELECTED':
      if (!action.selected || !action.id)
        throw new Error('Error: add selected or id to the reducer')
      const filter = state.find(filter => filter.id === action.id)

      return filter
        ? [
            ...state.filter(filter => action.id !== filter.id),
            { ...filter, selected: action.selected },
          ].sort((a, b) => sortAlphabetically(a.name, b.name))
        : state
    default:
      return state
  }
}

export const initFilters: Filter[] = []
