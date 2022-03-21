import React from 'react'
// import clsx from 'clsx'
import {
  TableHead,
  TableRow,
  TableCell,
  // Checkbox,
  TableSortLabel,
  // IconButton,
  // Typography,
  // Box,
} from '@material-ui/core'
// import { Delete as DeleteIcon } from '@material-ui/icons'

import { Order, headCells } from '../utils'
import useStyles from '../styles'

interface ReportTableHeaderProps {
  numSelected: number
  rowCount: number
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  // onMultiDelete: (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => void
  order: Order
  orderBy: string
  onSort: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    key: string
  ) => void
}

export function ReportTableHeader(props: ReportTableHeaderProps) {
  const classes = useStyles()
  const {
    // numSelected,
    // rowCount,
    // onSelectAllClick,
    order,
    orderBy,
    onSort,
    // onMultiDelete,
  } = props

  return (
    <TableHead className={classes.tableHead}>
      <TableRow style={{ height: '75px' }}>
        <TableCell width="4%" padding="checkbox">
          {/* <Box>
            <Checkbox
              disabled={rowCount === 0}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </Box> */}
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            width={headCell.width}
            key={headCell.key}
            align={headCell.numeric ? 'right' : 'left'}
            padding="normal"
            sortDirection={orderBy === headCell.key ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.key}
              direction={orderBy === headCell.key ? order : 'asc'}
              onClick={event => onSort(event, headCell.key)}
              // className={clsx(numSelected > 0 && classes.hiddenCell)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell width="4%" align="center" padding="checkbox">
          {/* {numSelected > 0 && (
            <IconButton onClick={onMultiDelete}>
              <DeleteIcon />
            </IconButton>
          )} */}
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export default ReportTableHeader
