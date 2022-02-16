import React from 'react'
import { TextField } from '@material-ui/core'
import { produce } from 'immer'

import { useTabs } from '../../hooks'

import { useStyles } from './styles'

export function TableSearch() {
  const classes = useStyles()
  const { currentTab, updateCurrentTab, addCustomTab } = useTabs()

  const onChange = (query: string) => {
    if (currentTab.key !== 'ALL_EXPORTS') {
      updateCurrentTab(
        produce(currentTab, draft => {
          draft.filter.query = query
        })
      )
    } else {
      addCustomTab({
        ...currentTab.filter,
        query: query,
      })
    }
  }

  return (
    <TextField
      fullWidth
      className={classes.search}
      value={currentTab.filter.query}
      onChange={event => onChange(event.target.value)}
    />
  )
}

export default TableSearch
