import React from 'react'
import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel } from '@material-ui/core'

import { Order, headCells } from '../utils'

interface ReportTableHeaderProps {
  numSelected: number
  rowCount: number
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  onSort: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: string) => void
}

export function ReportTableHeader(props: ReportTableHeaderProps) {
  const { numSelected, rowCount, onSelectAllClick, order, orderBy, onSort } = props

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={(event) => onSort(event, headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell
          align="center"
          padding="normal"
        />
      </TableRow>
    </TableHead>
  )
}

export default ReportTableHeader
