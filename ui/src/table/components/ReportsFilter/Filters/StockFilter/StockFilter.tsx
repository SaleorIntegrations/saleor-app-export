import React from 'react'

import { Filter } from '../Filter'
import { Filter as FilterType, ReducerAction } from '../../FilterButton/reducer'

export interface StockFilterProps {
  filter: FilterType
  dispatch: (action: ReducerAction) => void
}

export function StockFilter(props: StockFilterProps) {
  const { filter, dispatch } = props

  return (
    <Filter
      loadMore={() => {}}
      setCanFetch={() => {}}
      hasNext={false}
      filter={filter}
      dispatch={dispatch}
      filterOptions={[
        { id: 'stock-available', name: 'Available' },
        { id: 'stock-out', name: 'Out Of Stock' },
      ]}
      type="radio"
    />
  )
}

export default StockFilter
