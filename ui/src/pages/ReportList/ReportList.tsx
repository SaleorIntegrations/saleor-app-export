import React, { useState } from 'react'
import { Paper } from '@material-ui/core'

import TableHeader from '../../components/TableHeader'
import ReportTable from '../../components/ReportTable'
import ReportsFilter from '../../components/ReportsFilter'

export function ReportList() {
  const [reports, setReports] = useState(
    data.map(d => ({ ...d, isSelected: false }))
  )

  return (
    <Paper>
      <TableHeader />
      <ReportsFilter />
      <ReportTable reports={reports} setReports={setReports} />
    </Paper>
  )
}

export default ReportList

const data = [
  { id: '1', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '2', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '3', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '4', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '5', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '6', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '7', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '8', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '9', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '10', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '11', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '12', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '13', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '14', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '15', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '16', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '17', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '18', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '19', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '20', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '21', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '22', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '23', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '24', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '25', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '26', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '27', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '28', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '29', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '30', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '31', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '32', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '33', name: 'Quarterly sales', entity: 'Orders', recipients: 50 },
  { id: '34', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '35', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '36', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '37', name: 'Quarterly sales', entity: 'Orders', recipients: 60 },
  { id: '38', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '39', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '40', name: 'Quarterly sales', entity: 'Orders', recipients: 10 },
  { id: '41', name: 'Quarterly sales', entity: 'Orders', recipients: 10 },
  { id: '42', name: 'Quarterly sales', entity: 'Orders', recipients: 10 },
  { id: '43', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '44', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '45', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '46', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '47', name: 'Quarterly sales', entity: 'Orders', recipients: 10 },
  { id: '48', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '49', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '50', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '51', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '52', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '53', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '54', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '55', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '56', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '57', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '58', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '59', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '60', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
  { id: '61', name: 'Quarterly sales', entity: 'Orders', recipients: 20 },
]
