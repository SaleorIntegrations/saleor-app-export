import React, { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core'

import { Filter, Option } from '../Filter'
import useStyles from '../styles'
import { Filter as FilterType, ReducerAction } from '../../FilterButton/reducer'
import { useSearchAttributeValuesQuery } from '../../../../../api/saleor/query/attributesValues'

export interface AttributeFilterProps {
  filter: FilterType
  dispatch: (action: ReducerAction) => void
}

export function AttributeFilter(props: AttributeFilterProps) {
  const classes = useStyles()
  const { filter, dispatch } = props
  const [canFetch, setCanFetch] = useState(false)
  const [query, setQuery] = useState({
    set: false,
    value: '',
  })
  const [globalOptions, setGlobalOptions] = useState({
    navigation: { after: '', hasNext: false },
    options: [] as Option[],
  })
  const [searchedOptions, setSearchedOptions] = useState({
    navigation: { after: '', hasNext: false },
    options: [] as Option[],
  })
  const [searchedAttributeValues, fetchSearchedAttributeValues] =
    useSearchAttributeValuesQuery(
      filter.id,
      !query.value
        ? globalOptions.navigation.after
        : searchedOptions.navigation.after,
      5,
      query.value,
      {
        pause: true,
      }
    )

  const onSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchedOptions({
      options: [],
      navigation: { after: '', hasNext: false },
    })
    setQuery({
      value: event.target.value,
      set: true,
    })
  }

  const searchInput = (
    <TextField
      className={classes.searchInput}
      value={query.value}
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

  const fetch = (options?: any) => {
    fetchSearchedAttributeValues(options)
  }

  useEffect(() => {
    if (searchedAttributeValues.data) {
      if (query.value) {
        setSearchedOptions({
          options: [...searchedOptions.options, ...unzipOptions()],
          navigation: {
            hasNext:
              searchedAttributeValues.data.attribute.choices.pageInfo
                .hasNextPage,
            after:
              searchedAttributeValues.data.attribute.choices.pageInfo
                .endCursor || '',
          },
        })
      } else {
        setGlobalOptions({
          options: [...globalOptions.options, ...unzipOptions()],
          navigation: {
            hasNext:
              searchedAttributeValues.data.attribute.choices.pageInfo
                .hasNextPage,
            after:
              searchedAttributeValues.data.attribute.choices.pageInfo
                .endCursor || '',
          },
        })
      }
    }
  }, [searchedAttributeValues.data])

  useEffect(() => {
    if (canFetch === true) {
      if (query.value !== '' && query.set)
        fetch({ requestPolicy: 'network-only' })

      if (!query.set) fetch()
    }
  }, [canFetch, query.value])

  return (
    <Filter
      loadMore={fetch}
      setCanFetch={setCanFetch}
      hasNext={
        query.value
          ? searchedOptions.navigation.hasNext
          : globalOptions.navigation.hasNext
      }
      filter={filter}
      dispatch={dispatch}
      searchInput={searchInput}
      filterOptions={
        query.value ? searchedOptions.options : globalOptions.options
      }
      type="checkbox"
    />
  )
}

export default AttributeFilter
