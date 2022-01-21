import React, { useState, useEffect, useReducer } from 'react'
import { Box, Button, Popover, Typography } from '@material-ui/core'

import useStyles from '../styles'
import { useQueryInitialProductFilterAttributes } from '../../../api/saleor/query'
import { evaluateAttributeFilterType } from '../../../utils'

import { reducer, initFilters, Filter } from './reducer'
import { FilterComponents } from './FilterComponents'
import {
  settledCategoryFilter,
  settledChannelFilter,
  settledCollectionsFilter,
  settledPriceFilter,
  settledProductTypesFilter,
  settledStockQuantityFilter,
} from './settledFilters'

export function FilterButton() {
  const [filters, dispatch] = useReducer(reducer, initFilters)
  const [initialProductsFilters] = useQueryInitialProductFilterAttributes()
  const [count, setCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)
  const classes = useStyles()

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget)
    setIsOpen(true)
  }

  const handleFilterClose = () => {
    setAnchor(null)
    setIsOpen(false)
    submit()
  }

  const submit = () => {}

  const clearFilters = () => {
    dispatch({ type: 'CLEAR' })
  }

  const assignFilter = (filter: Filter) => {
    const FilterComponent = FilterComponents[filter.filterType]

    if (!FilterComponent) return null

    return (
      <FilterComponent key={filter.id} filter={filter} dispatch={dispatch} />
    )
  }

  useEffect(() => {
    if (initialProductsFilters.data) {
      const initialFilters = initialProductsFilters.data.attributes.edges

      const settledInitialFilters = initialFilters.map<Filter>(
        ({ node: { id, name } }) => ({
          filterType: evaluateAttributeFilterType(name),
          id: id,
          name: name,
          checked: false,
          selected: [],
        })
      )

      dispatch({
        type: 'SET_FILTERS',
        filters: [
          ...settledInitialFilters,
          settledCategoryFilter,
          settledChannelFilter,
          settledStockQuantityFilter,
          settledProductTypesFilter,
          settledCollectionsFilter,
          settledPriceFilter,
        ],
      })
    }
  }, [initialProductsFilters])

  useEffect(() => {
    setCount(filters.filter(filter => filter.checked).length)
  }, [filters])

  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={onButtonClick}>
        <span>Filters</span>
        {count > 0 && (
          <>
            <Box className={classes.filterSeparator}></Box>
            <span>{count}</span>
          </>
        )}
      </Button>
      <Popover
        open={isOpen}
        anchorEl={anchor}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={handleFilterClose}
      >
        <form>
          <Box className={classes.filterPopover}>
            <Box className={classes.filterHeader}>
              <Typography
                component="p"
                className={classes.filterContentHeader}
                variant="body1"
              >
                Filters
              </Typography>
              <Button onClick={clearFilters}>Clear</Button>
              <Button
                onClick={handleFilterClose}
                color="primary"
                variant="contained"
              >
                Done
              </Button>
            </Box>
            {filters.map(filter => assignFilter(filter))}
          </Box>
        </form>
      </Popover>
    </Box>
  )
}

export default FilterButton
