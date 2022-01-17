import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { TableReport } from '../../globalTypes'

interface ReportTableProps {
  reports: TableReport[]
  toggleReport: (id: number) => void
  selectAllReports: () => void
  unselectAllReports: () => void
  deleteReport: (id: number) => void
  deleteSelectedReports: () => void
  page: number
  setPage: (page: number) => void
  rowsPerPage: number
  setRowsPerPage: (rowsPerPage: number) => void
  count: number
  subtract?: number
}

export function ReportTable(props: ReportTableProps) {
  const {
    reports,
    toggleReport,
    selectAllReports,
    unselectAllReports,
    deleteReport,
    deleteSelectedReports,
    count,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    subtract,
  } = props
  const navigate = useNavigate()
  const paginationRef = useRef<HTMLDivElement>(null)
  const [orderBy, setOrderBy] = useState('name')
  const [order, setOrder] = useState<Order>('asc')
  const [coreSubtract, setCoreSubtract] = useState(0)

  const onSort = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    key: string
  ) => {
    setOrderBy(key)
    if (orderBy === key) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    }
  }

  const onSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      selectAllReports()
    } else {
      unselectAllReports()
    }
  }

  useEffect(() => {
    const paginationHeight = paginationRef.current?.clientHeight || 52
    const headerHeight = subtract || 0
    const newCoreSubtract = paginationHeight + headerHeight
    setCoreSubtract(newCoreSubtract)
  }, [subtract, paginationRef])

  return (
    <Box height={`calc(100% - ${coreSubtract}px)`} minHeight="200px">
      <TableContainer style={{ height: '100%', overflow: 'scroll' }}>
        <Table stickyHeader>
          <ReportTableHeader
            numSelected={
              reports.filter(report => report.isSelected === true).length
            }
            rowCount={reports.length}
            onSelectAllClick={onSelectAllClick}
            onMultiDelete={() => deleteSelectedReports()}
            order={order}
            orderBy={orderBy}
            onSort={onSort}
          />
          <TableBody>
            {sortTable<TableReport>(reports, orderBy, order)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(d => (
                <ReportTableRow
                  onRowClick={(_, id) => navigate(`/report/${id}`)}
                  key={d.id}
                  id={d.id}
                  name={d.name}
                  entity={d.entity}
                  recipients={d.recipients}
                  isSelected={d.isSelected}
                  onSelect={(_, id) => toggleReport(id)}
                  onDelete={(_, id) => deleteReport(id)}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        ref={paginationRef}
        rowsPerPageOptions={[5, 10, 25, 50]}
        count={count}
        component="div"
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={event =>
          setRowsPerPage(parseInt(event.target.value))
        }
      />
    </Box>
  )
}

export default ReportTable
