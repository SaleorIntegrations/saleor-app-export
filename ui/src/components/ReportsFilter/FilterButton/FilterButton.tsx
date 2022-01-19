import React, { useState, useEffect, useReducer } from 'react'
import { Box, Button, Popover, Typography } from '@material-ui/core'

import useStyles from '../styles'
import AttributeFilter from '../Filters/AttributeFilter'
import CategoriesFilter from '../Filters/CategoriesFilter'
import ChannelsFilter from '../Filters/ChannelsFilter'
import ReleaseFilter from '../Filters/ReleaseFilter'
import SignedFilter from '../Filters/SignedFilter'
import StockFilter from '../Filters/StockFilter'
import CollectionsFilter from '../Filters/CollectionsFilter'
import ProductTypesFilter from '../Filters/ProductTypesFilter'
import PriceFilter from '../Filters/PriceFilter'
import { useQueryInitialProductFilterAttributes } from '../../../api/saleor/query'
import { reducer, initFilters, Filter } from './reducer'

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

  const submit = () => {
    console.log(filters.filter(filter => filter.checked === true))
  }

  const clearFilters = () => {
    dispatch({ type: 'CLEAR' })
  }

  const assignFilter = (filter: Filter) => {
    const FilterComponents: Record<string, Function> = {
      attribute: AttributeFilter,
      category: CategoriesFilter,
      channel: ChannelsFilter,
      release: ReleaseFilter,
      signed: SignedFilter,
      stock: StockFilter,
      'product-types': ProductTypesFilter,
      collection: CollectionsFilter,
      price: PriceFilter,
    }

    const FilterComponent = FilterComponents[filter.filterType]

    if (!FilterComponent) return null

    return (
      <FilterComponent key={filter.id} filter={filter} dispatch={dispatch} />
    )
  }

  const evaluateAttributeFilterType = (name: string) => {
    switch (name) {
      case 'Release Date':
        return 'release'
      case 'Signed':
        return 'signed'
      default:
        return 'attribute'
    }
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

      const settledCategoryFilter: Filter = {
        filterType: 'category',
        id: 'category-id',
        name: 'Categories',
        checked: false,
        selected: [],
      }

      const settledChannelFilter: Filter = {
        filterType: 'channel',
        id: 'channel-id',
        name: 'Channel',
        checked: false,
        selected: [],
      }

      const settledStockQuantityFilter: Filter = {
        filterType: 'stock',
        id: 'stock-id',
        name: 'Stock Quantity',
        checked: false,
        selected: [],
      }

      const settledProductTypesFilter: Filter = {
        filterType: 'product-types',
        id: 'product-types-id',
        name: 'Product Types',
        checked: false,
        selected: [],
      }

      const settledCollectionsFilter: Filter = {
        filterType: 'collection',
        id: 'collection-id',
        name: 'Collections',
        checked: false,
        selected: [],
      }

      const settledPriceFilter: Filter = {
        filterType: 'price',
        id: 'price-id',
        name: 'Price',
        checked: false,
        selected: [],
      }

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