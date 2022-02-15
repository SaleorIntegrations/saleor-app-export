import React, { useState } from 'react'
import { Box, Button, TextField } from '@material-ui/core'
import { produce } from 'immer'

import { PopoverFilter } from '../PopoverFilter'
import { FilterContainer } from '../FilterContainer'
import { CreateCustomFilter } from '../CreateCustomFilter'
import { useTabs } from '../../hooks'
import { TableTabs } from '../TableTabs'
import { Filter } from '../../globalTypes'

import { useStyles } from './styles'

export function TableReportFilter() {
  const { addTab, setCurrentTab, updateCurrentTab, currentTab } = useTabs()
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')

  const onFilterChange = (filter: Filter) => {
    const key = currentTab.key === 'ALL' ? 'SEARCH_CUSTOM' : currentTab.key

    if (currentTab.key === key) {
      updateCurrentTab(
        produce(currentTab, draft => {
          draft.filter = filter
        })
      )
    } else {
      addTab({
        key: key,
        title: 'Custom Filter',
        filter: filter,
      })
      setCurrentTab(key)
    }
  }

  const onSearchSave = () => {
    const tab = {
      key: name.toUpperCase(),
      title: name,
      filter: currentTab.filter,
    }
    addTab(tab)
    setCurrentTab(tab.key)
    setName('')
    setIsOpen(false)
  }

  return (
    <Box>
      <TableTabs />
      <Box className={classes.searchBar}>
        <PopoverFilter
          render={setIsFilterOpen => (
            <FilterContainer setIsOpen={setIsFilterOpen} />
          )}
        />
        <TextField
          fullWidth
          className={classes.search}
          value={currentTab.filter.query}
          onChange={event =>
            onFilterChange(
              produce(currentTab.filter, draft => {
                draft.query = event.target.value
              })
            )
          }
        />
        {currentTab.key === 'SEARCH_CUSTOM' && (
          <Button
            style={{ minWidth: 'max-content' }}
            onClick={() => setIsOpen(true)}
            variant="outlined"
            color="primary"
          >
            Save search
          </Button>
        )}
      </Box>
      <CreateCustomFilter
        isOpen={isOpen}
        onSave={onSearchSave}
        onClose={() => {
          setName('')
          setIsOpen(false)
        }}
        setName={setName}
        name={name}
      />
    </Box>
  )
}

export default TableReportFilter
