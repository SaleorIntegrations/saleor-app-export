import React, { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core'

import { Filter, Option } from '../Filter'
import useStyles from '../styles'
import { Filter as FilterType, ReducerAction } from '../../FilterButton/reducer'
import { useSearchAttributeValuesQuery } from '../../../../api/attributesValues'

export interface AttributeFilterProps {
  filter: FilterType
  dispatch: (action: ReducerAction) => void
}

export function AttributeFilter(props: AttributeFilterProps) {
  const classes = useStyles()
  const { filter, dispatch } = props
  const [canFetch, setCanFetch] = useState(false)
  const [query, setQuery] = useState('')
  const [navigation, setNavigation] = useState({ after: '', hasNext: false })
  const [searchedAttributeValues, fetchSearchedAttributeValues] =
    useSearchAttributeValuesQuery(filter.id, navigation.after, 1, query, {
      pause: true,
    })
  const [options, setOptions] = useState<Option[]>([])

  const onSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setQuery(event.target.value)
    setOptions([])
    setNavigation({ after: '', hasNext: false })
  }

  const searchInput = (
    <TextField
      className={classes.searchInput}
      value={query}
      onChange={onSearchChange}
    />
  )

  const unzipOptions = () => {
    if (searchedAttributeValues.data) {
      return searchedAttributeValues.data.attribute.choices.edges.map(
        ({ node: { id, name } }) => ({ id, name })
      )
    }

    return []
  }

  const fetch = () => {
    console.log('fetched')
    fetchSearchedAttributeValues()
  }

  useEffect(() => {
    if (searchedAttributeValues.data && !searchedAttributeValues.fetching) {
      setOptions([...options, ...unzipOptions()])
      setNavigation({
        hasNext:
          searchedAttributeValues.data.attribute.choices.pageInfo.hasNextPage,
        after:
          searchedAttributeValues.data.attribute.choices.pageInfo.endCursor,
      })
    }
  }, [searchedAttributeValues.data])

  useEffect(() => {
    if (canFetch === true) {
      fetch()
    }
  }, [canFetch, query])

  return (
    <Filter
      loadMore={fetch}
      setCanFetch={setCanFetch}
      hasNext={navigation.hasNext}
      filter={filter}
      dispatch={dispatch}
      searchInput={searchInput}
      filterOptions={options}
      type="checkbox"
    />
  )
}

export default AttributeFilter
