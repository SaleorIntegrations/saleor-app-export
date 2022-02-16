import React, { useCallback, useState } from 'react'
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
  const { addTab, setCurrentTab, updateCurrentTab, currentTab, addCustomTab } =
    useTabs()
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')

  const onFilterChange = (filter: Filter) => {
    if (currentTab.key !== 'ALL_EXPORTS') {
      updateCurrentTab(
        produce(currentTab, draft => {
          draft.filter = filter
        })
      )
    } else {
      addCustomTab(filter)
    }
  }

  const onSave = useCallback(() => {
    const tab = {
      key: name.toUpperCase().replaceAll(' ', '_'),
      title: name,
      filter: currentTab.filter,
    }
    addTab(tab)
    setCurrentTab(tab.key)
    setName('')
    setIsOpen(false)
  }, [name])

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
            onFilterChange({
              ...currentTab.filter,
              query: event.target.value,
            })
          }
        />
        {currentTab.key === 'CUSTOM_FILTER' && (
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
        onSave={onSave}
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
