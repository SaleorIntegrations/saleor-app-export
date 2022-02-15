import React, { useEffect } from 'react'
import { Tabs as NavigationTabs, Tab as NavigationTab } from '@material-ui/core'
import { DeleteRounded as DeleteIcon } from '@material-ui/icons'

import { useTabs } from '../../hooks'

import { useStyles } from './styles'

export function TableTabs() {
  const classes = useStyles()
  const { tabs, setCurrentTab, currentTab, removeTab } = useTabs()

  const onDelete = (key: string) => {
    removeTab(key)
  }

  useEffect(() => {
    window.localStorage.setItem('FILTER', JSON.stringify(tabs))
  }, [tabs])

  useEffect(() => {
    setCurrentTab('ALL')
  }, [])

  return (
    <NavigationTabs
      className={classes.tabs}
      variant="scrollable"
      indicatorColor="primary"
      value={currentTab?.key}
      onChange={(_, key) => setCurrentTab(key)}
    >
      {Object.keys(tabs).map(key => (
        <NavigationTab
          value={key}
          key={key}
          label={
            <>
              {tabs[key].title}
              {!['ALL', 'SEARCH_CUSTOM'].includes(key) && (
                <DeleteIcon
                  className={classes.icon}
                  onClick={event => {
                    event.stopPropagation()
                    onDelete(key)
                  }}
                />
              )}
            </>
          }
        />
      ))}
    </NavigationTabs>
  )
}

export default TableTabs
