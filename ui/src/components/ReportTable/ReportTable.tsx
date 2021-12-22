import React, { useState } from 'react'
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
} from '@material-ui/core'

import ReportTableHeader from './ReportTableHeader'
import ReportTableRow from './ReportTableRow'
import { Order } from './utils'
import sortTable from '../../utils/sortTable'
import useStyles from './styles'

type ReportRecord = {
  id: string
  name: string
  entity: string
  recipients: number
  isSelected: boolean
}

interface ReportTableProps {
  reports: ReportRecord[]
  setReports: (newData: ReportRecord[]) => void
}

export function ReportTable({ reports, setReports }: ReportTableProps) {
  const classes = useStyles()
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [page, setPage] = useState(0)
  const [orderBy, setOrderBy] = useState('')
  const [order, setOrder] = useState<Order>('asc')

  const onSort = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    key: string
  ) => {
    setOrderBy(key)
    if (orderBy === key) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    }
    setPage(0)
  }

  const onDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    event.stopPropagation()
    setReports(reports.filter(report => report.id !== id))
  }

  const onSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setReports(reports.map(report => ({ ...report, isSelected: true })))
    } else {
      setReports(reports.map(report => ({ ...report, isSelected: false })))
    }
  }

  const onSelect = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    event.stopPropagation()
    setReports(
      reports.map(report => {
        return report.id === id
          ? { ...report, isSelected: !report.isSelected }
          : report
      })
    )
  }

  const onRowClick = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    id: string
  ) => {
    alert(id)
  }

  const onMultiDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation()
    setReports(reports.filter(report => report.isSelected === false))
  }

  return (
    <Box className={classes.container}>
      <TableContainer>
        <Table className={classes.table}>
          <ReportTableHeader
            numSelected={
              reports.filter(report => report.isSelected === true).length
            }
            rowCount={reports.length}
            onSelectAllClick={onSelectAllClick}
            onMultiDelete={onMultiDelete}
            order={order}
            orderBy={orderBy}
            onSort={onSort}
          />
          <TableBody>
            {sortTable<ReportRecord>(reports, orderBy, order)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(d => (
                <ReportTableRow
                  onRowClick={onRowClick}
                  key={d.id}
                  id={d.id}
                  name={d.name}
                  entity={d.entity}
                  recipients={d.recipients}
                  isSelected={d.isSelected}
                  onSelect={onSelect}
                  onDelete={onDelete}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        count={reports.length}
        component="div"
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={event => {
          setRowsPerPage(parseInt(event.target.value))
          setPage(0)
        }}
      />
    </Box>
  )
}

export default ReportTable
