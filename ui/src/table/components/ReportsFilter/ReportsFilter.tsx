import React, { useState } from 'react'
import { Box, Button, TextField } from '@material-ui/core'

import useStyles from './styles'
import FilterButton from './FilterButton'

export function ReportsFilter() {
  const [search, setSearch] = useState('')
  const classes = useStyles()

  return (
    <Box className={classes.filterBox}>
      <FilterButton />
      <TextField
        className={classes.search}
        variant="outlined"
        value={search}
        onChange={event => setSearch(event.target.value)}
      />
      {search.length > 0 && <Button color="primary">Save Search</Button>}
    </Box>
  )
}

export default ReportsFilter
