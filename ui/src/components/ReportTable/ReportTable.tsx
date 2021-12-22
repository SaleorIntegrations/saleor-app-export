import React from 'react'
import { Box, TableContainer, Table, TableBody } from '@material-ui/core'

import ReportTableHeader from './ReportTableHeader'
import ReportTableRow from './ReportTableRow'
import useStyles from './styles'

const data = [
  { id: '1', name: 'Quarterly sales', entity: 'Orders', recipients: 20, isSelected: true },
]

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
          <TableBody>
            {data.map(d => (
              <ReportTableRow
                id={d.id}
                name={d.name}
                entity={d.entity}
                recipients={d.recipients}
                isSelected={d.isSelected}
                onSelect={(event) => alert(`slected: ${d.id}`)}
                onDelete={(event) => alert(`deleted: ${d.id}`)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ReportTable
