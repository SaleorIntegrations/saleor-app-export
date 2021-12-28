import React, { useState, useCallback } from 'react'
import { TextField } from '@material-ui/core'

import { Filter, Option } from '../Filter'
import useStyles from '../styles'
import { Filter as FilterType } from '../../FilterButton'
import { useSearchAttributeValuesQuery } from '../../../../api/attributesValues'

export interface AttributeFilterProps {
  filter: FilterType
  changeFilter: (filter: FilterType) => void
}

export function AttributeFilter(props: AttributeFilterProps) {
  const classes = useStyles()
  const { filter, changeFilter } = props
  const [searchedAttributeValues, fetchSearchedAttributeValues] =
    useSearchAttributeValuesQuery(filter.id, '', 10, '', { pause: true })
  const [search, setSearch] = useState('')
  const attributeValues = searchedAttributeValues.data?.attribute.choices.edges

  const onSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearch(event.target.value)
  }

  const searchInput = (
    <TextField
      className={classes.searchInput}
      value={search}
      onChange={onSearchChange}
    />
  )

  const filtredFilterOptions = useCallback((): Option[] | undefined => {
    return attributeValues
      ?.filter(value =>
        value.node.slug.toLowerCase().includes(search.toLowerCase())
      )
      .map(({ node }) => ({ id: node.id, name: node.name }))
  }, [filter, search, attributeValues])

  return (
    <Filter
      fetchFilterOptions={fetchSearchedAttributeValues}
      filter={filter}
      changeFilter={changeFilter}
      searchInput={searchInput}
      filterOptions={filtredFilterOptions()}
      type="checkbox"
    />
  )
}

export default AttributeFilter
