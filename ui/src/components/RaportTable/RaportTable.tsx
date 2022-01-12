import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
} from '@material-ui/core'

import ReportTableHeader from './RaportTableHeader'
import ReportTableRow from './RaportTableRow'
import { Order } from './utils'
import sortTable from '../../utils/sortTable'
import { TableRaport } from '../../globalTypes'

interface ReportTableProps {
  raports: TableRaport[]
  toggleRaport: (id: number) => void
  selectAllRaports: () => void
  unselectAllRaports: () => void
  deleteRaport: (id: number) => void
  deleteSelectedRaports: () => void
  page: number
  setPage: (page: number) => void
  rowsPerPage: number
  setRowsPerPage: (rowsPerPage: number) => void
  count: number
  subtract?: number
}

export function RaportTable(props: ReportTableProps) {
  const {
    raports,
    toggleRaport,
    selectAllRaports,
    unselectAllRaports,
    deleteRaport,
    deleteSelectedRaports,
    count,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    subtract,
  } = props
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
      selectAllRaports()
    } else {
      unselectAllRaports()
    }
  }

  useEffect(() => {
    const paginationHeight = paginationRef.current?.clientHeight || 52
    const headerHeight = subtract || 0
    const newCoreSubtract = paginationHeight + headerHeight
    setCoreSubtract(newCoreSubtract)
  }, [])

  return (
    <Box height={`calc(100% - ${coreSubtract}px)`} minHeight="200px">
      <TableContainer style={{ height: '100%', overflow: 'scroll' }}>
        <Table stickyHeader>
          <ReportTableHeader
            numSelected={
              raports.filter(raport => raport.isSelected === true).length
            }
            rowCount={raports.length}
            onSelectAllClick={onSelectAllClick}
            onMultiDelete={() => deleteSelectedRaports()}
            order={order}
            orderBy={orderBy}
            onSort={onSort}
          />
          <TableBody>
            {sortTable<TableRaport>(raports, orderBy, order)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(d => (
                <ReportTableRow
                  onRowClick={(_, id) => alert(id)}
                  key={d.id}
                  id={d.id}
                  name={d.name}
                  entity={d.entity}
                  recipients={d.recipients}
                  isSelected={d.isSelected}
                  onSelect={(_, id) => toggleRaport(id)}
                  onDelete={(_, id) => deleteRaport(id)}
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

export default RaportTable
