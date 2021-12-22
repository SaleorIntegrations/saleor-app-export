import React from 'react'
import { Box, TableContainer, Table } from '@material-ui/core'

import ReportTableHeader from './ReportTableHeader'
import useStyles from './styles'

export function ReportTable() {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      <TableContainer>
        <Table className={classes.table}>
          <ReportTableHeader
            numSelected={0}
            rowCount={0}
            onSelectAllClick={(event: any) => alert('All Selected/Unselected')}
            order="asc"
            orderBy="name"
            onSort={(event, id) => alert(`onSort ${id}`)}
          />
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ReportTable
