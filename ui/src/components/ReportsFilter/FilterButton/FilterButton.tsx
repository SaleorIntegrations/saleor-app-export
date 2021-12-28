import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { Box, Button, Popover, Typography } from '@material-ui/core'

import useStyles from '../styles'
import AttributeFilter from '../Filter/AttributeFilter'
import { useQueryGridAttributes } from '../../../api/gridAttributes'
import { reducer, initFilters } from './reducer'

export function FilterButton() {
  const [filters, dispatch] = useReducer(reducer, initFilters)
  const [result] = useQueryGridAttributes([])
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

  const submit = () => {
    console.log(filters.filter(filter => filter.checked === true))
  }

  const clearFilters = useCallback(() => {
    dispatch({ type: 'CLEAR' })
  }, [filters])

  useEffect(() => {
    if (result.data && filters.length === 0) {
      const newFilters = result.data.grid.edges

      dispatch({
        type: 'SET_FILTERS',
        filters: newFilters.map(({ node: { id, name } }) => ({
          id: id,
          name: name,
          checked: false,
          selected: [],
        })),
      })
    }
  }, [filters.length, result])

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
            {filters.map(filter => (
              <AttributeFilter
                key={filter.id}
                filter={filter}
                dispatch={dispatch}
              />
            ))}
          </Box>
        </form>
      </Popover>
    </Box>
  )
}

export default FilterButton
