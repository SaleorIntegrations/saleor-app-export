import React, { useEffect, useState, useRef } from 'react'
import { TextField } from '@material-ui/core'

import { Filter as FilterType, ReducerAction } from '../../FilterButton/reducer'
import { Filter, Option } from '../Filter'
import { useQuerySearchCategories } from '../../../../api/searchCategories'
import { useStyles } from '../styles'

export interface CategoriesFilterProps {
  filter: FilterType
  dispatch: (action: ReducerAction) => void
}

export function CategoriesFilter(props: CategoriesFilterProps) {
  const { filter, dispatch } = props

  return (
    // <Filter
    //   fetchFilterOptions={fetchCategoriesOptions}
    //   filter={filter}
    //   dispatch={dispatch}
    //   searchInput={searchInput}
    //   filterOptions={options}
    //   type="checkbox"
    // />
    <div>Category</div>
  )
}

export default CategoriesFilter
