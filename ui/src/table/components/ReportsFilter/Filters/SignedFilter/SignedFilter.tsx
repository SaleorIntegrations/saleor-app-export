import React from 'react'

import { Filter } from '../Filter'
import { Filter as FilterType, ReducerAction } from '../../FilterButton/reducer'

export interface SignedFilterProps {
  filter: FilterType
  dispatch: (action: ReducerAction) => void
}

export function SignedFilter(props: SignedFilterProps) {
  const { filter, dispatch } = props

  return (
    <Filter
      loadMore={() => {}}
      setCanFetch={() => {}}
      hasNext={false}
      filter={filter}
      dispatch={dispatch}
      filterOptions={[
        { id: 'signed-true', name: 'true' },
        { id: 'signed-false', name: 'false' },
      ]}
      type="radio"
    />
  )
}

export default SignedFilter
