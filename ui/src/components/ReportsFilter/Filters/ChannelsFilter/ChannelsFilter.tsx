/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react'
import { TextField } from '@material-ui/core'

import { Filter, Option } from '../Filter'
import useStyles from '../styles'
import { Filter as FilterType, ReducerAction } from '../../FilterButton/reducer'
import { useQueryBaseChannels } from '../../../../api/saleor/query'

export interface ChannelFilterProps {
  filter: FilterType
  dispatch: (action: ReducerAction) => void
}

export function ChannelFilter(props: ChannelFilterProps) {
  const classes = useStyles()
  const { filter, dispatch } = props
  const [canFetch, setCanFetch] = useState(false)
  const [query, setQuery] = useState('')
  const [options, setOptions] = useState<Option[]>([])
  const [baseChannels, fetchBaseChannels] = useQueryBaseChannels({
    pause: true,
  })

  const onSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setQuery(event.target.value)
  }

  const searchInput = (
    <TextField
      className={classes.searchInput}
      value={query}
      onChange={onSearchChange}
    />
  )

  const unzipOptions = () => {
    if (baseChannels.data) {
      return baseChannels.data.channels.map(({ id, name }) => ({ id, name }))
    }

    return []
  }

  const filtredOptions = useCallback(() => {
    return options.filter(option =>
      option.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, options])

  const fetch = (options?: any) => {
    fetchBaseChannels(options)
  }

  useEffect(() => {
    if (canFetch === true) fetch()
  }, [canFetch])

  useEffect(() => {
    if (baseChannels.data) setOptions(unzipOptions)
  }, [baseChannels.data])

  return (
    <Filter
      loadMore={fetch}
      setCanFetch={setCanFetch}
      hasNext={false}
      filter={filter}
      dispatch={dispatch}
      searchInput={searchInput}
      filterOptions={filtredOptions()}
      type="radio"
    />
  )
}

export default ChannelFilter
