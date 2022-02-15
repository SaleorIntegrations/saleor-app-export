import React, { useState, useEffect } from 'react'
import { Tabs, Tab, Box, Button, TextField } from '@material-ui/core'
import { CloseRounded as DeleteIcon } from '@material-ui/icons'
import { produce } from 'immer'

import { PopoverFilter } from '../PopoverFilter'
import { FilterContainer } from '../FilterContainer'
import { CreateCustomFilter } from '../CreateCustomFilter'

import { useStyles } from './styles'

type Filter = {
  query: string
}
interface SearchTab {
  name: string
  filter: Filter
}

type SearchTabs = Record<string, SearchTab>

export function TableReportFilter() {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [tabs, setTabs] = useState<SearchTabs>(
    JSON.parse(
      window.localStorage.getItem('FILTER') ||
        JSON.stringify({
          ALL: {
            name: 'All Exports',
            filter: {
              query: '',
            },
          },
        })
    )
  )
  const [tab, setTab] = useState('ALL')

  const onFilterChange = (filter: Filter) => {
    const key = tab === 'ALL' ? 'SEARCH_CUSTOM' : tab

    if (tabs[key]) {
      setTabs(
        produce(draft => {
          draft[key].filter = filter
        })
      )
    } else {
      setTabs(
        produce(draft => {
          draft[key] = {
            name: 'Custom Filter',
            filter: filter,
          }
        })
      )

      setTab('SEARCH_CUSTOM')
    }
  }

  const onTabChange = (newTab: string) => {
    if (newTab !== tab) {
      setTab(newTab)
      setTabs(
        produce(draft => {
          delete draft['SEARCH_CUSTOM']
        })
      )
    }
  }

  const onSearchSave = () => {
    const newTab: SearchTab = {
      name: name,
      filter: tabs['SEARCH_CUSTOM'].filter,
    }
    setTabs(
      produce(draft => {
        draft[name.toUpperCase()] = newTab
      })
    )
    onTabChange(name.toUpperCase())
    setName('')
    setIsOpen(false)
  }

  const onDelete = (event: React.MouseEvent, key: string) => {
    event.stopPropagation()

    if (tab === key) setTab('ALL')
    setTabs(
      produce(draft => {
        delete draft[key]
      })
    )
  }

  useEffect(() => {
    window.localStorage.setItem('FILTER', JSON.stringify(tabs))
  }, [tabs])

  return (
    <Box>
      <Tabs
        className={classes.tabs}
        variant="scrollable"
        indicatorColor="primary"
        value={tab}
        onChange={(_, newTab) => onTabChange(newTab)}
      >
        {Object.keys(tabs).map(key => (
          <Tab
            value={key}
            key={key}
            label={
              <>
                {tabs[key].name}
                {!['ALL', 'SEARCH_CUSTOM'].includes(key) && (
                  <DeleteIcon
                    className={classes.icon}
                    onClick={event => onDelete(event, key)}
                  />
                )}
              </>
            }
          />
        ))}
      </Tabs>
      <Box className={classes.searchBar}>
        <PopoverFilter
          render={setIsFilterOpen => (
            <FilterContainer setIsOpen={setIsFilterOpen} />
          )}
        />
        <TextField
          fullWidth
          className={classes.search}
          value={tabs[tab].filter.query}
          onChange={event =>
            onFilterChange(
              produce(tabs[tab].filter, draft => {
                draft.query = event.target.value
              })
            )
          }
        />
        {tab === 'SEARCH_CUSTOM' && (
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
