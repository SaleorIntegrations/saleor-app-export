import React, { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core'

import { Filter, Option } from '../Filter'
import useStyles from '../styles'
import { Filter as FilterType, ReducerAction } from '../../FilterButton/reducer'
import { useQuerySearchCollections } from '../../../../api/saleor/query'

export interface CollectionsFilterProps {
  filter: FilterType
  dispatch: (action: ReducerAction) => void
}

export function CollectionsFilter(props: CollectionsFilterProps) {
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
  const [searchedCollections, fetchSearchedCollections] =
    useQuerySearchCollections(
      {
        after: !query.value
          ? globalOptions.navigation.after
          : searchedOptions.navigation.after,
        first: 10,
        query: query.value,
      },
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
    if (searchedCollections.data) {
      return searchedCollections.data.search.edges.map(
        ({ node: { id, name } }) => ({ id, name })
      )
    }

    return []
  }

  const fetch = (options?: any) => {
    fetchSearchedCollections(options)
  }

  useEffect(() => {
    if (searchedCollections.data) {
      if (query.value) {
        setSearchedOptions({
          options: [...searchedOptions.options, ...unzipOptions()],
          navigation: {
            hasNext: searchedCollections.data.search.pageInfo.hasNextPage,
            after: searchedCollections.data.search.pageInfo.endCursor || '',
          },
        })
      } else {
        setGlobalOptions({
          options: [...globalOptions.options, ...unzipOptions()],
          navigation: {
            hasNext: searchedCollections.data.search.pageInfo.hasNextPage,
            after: searchedCollections.data.search.pageInfo.endCursor || '',
          },
        })
      }
    }
  }, [searchedCollections.data])

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

export default CollectionsFilter
