import React, { useState } from 'react'
import { Box, Button } from '@material-ui/core'

import { PopoverFilter } from '../PopoverFilter'
import { FilterContainer } from '../FilterContainer'
import { CreateCustomFilter } from '../CreateCustomFilter'
import { useTabs } from '../../../hooks'
import { TableTabs } from '../TableTabs'

import { useStyles } from './styles'
import TableSearch from '../TableSearch'

export function TableReportFilter() {
  const classes = useStyles()
  const { currentTab } = useTabs()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box>
      <TableTabs />
      <Box className={classes.searchBar}>
        <PopoverFilter
          render={setIsFilterOpen => (
            <FilterContainer setIsOpen={setIsFilterOpen} />
          )}
        />
        <TableSearch />
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
      <CreateCustomFilter isOpen={isOpen} setIsOpen={setIsOpen} />
    </Box>
  )
}

export default TableReportFilter
