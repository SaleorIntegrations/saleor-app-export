import React, { useState } from 'react'
import { Tabs, Tab, Box, Button, TextField } from '@material-ui/core'

import { useStyles } from './styles'

export function TableReportFilter() {
  const classes = useStyles()
  const [tab, setTab] = useState(1)
  const [query, setQuery] = useState('')

  return (
    <Box>
      <Tabs value={tab} onChange={(_, newTab) => setTab(newTab)}>
        <Tab label="All Exports" />
        <Tab label="Saved Search" />
      </Tabs>
      <Box>
        <Button variant="text" color="primary">
          FILTER
        </Button>
        <TextField
          className={classes.search}
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </Box>
    </Box>
  )
}

export default TableReportFilter
