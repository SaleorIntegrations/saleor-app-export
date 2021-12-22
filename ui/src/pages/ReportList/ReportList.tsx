import React from 'react'
import { Paper } from '@material-ui/core'

import TableHeader from '../../components/TableHeader'
import ReportTable from '../../components/ReportTable'

export function ReportList() {
  return (
    <Paper>
      <TableHeader />
      <ReportTable />
    </Paper>
  )
}

export default ReportList
