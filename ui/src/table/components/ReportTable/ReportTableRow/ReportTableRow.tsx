import React from 'react'
import {
  TableRow,
  TableCell,
  // Checkbox,
  IconButton,
} from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'

import useStyles from '../styles'

interface ReportTableRowProps {
  id: number
  name: string
  entity: string
  recipients: number
  group: number
  onDelete: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => void
  // onSelect: (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   id: number
  // ) => void
  onRowClick: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    id: number
  ) => void
  isSelected: boolean
}

export function ReportTableRow(props: ReportTableRowProps) {
  const classes = useStyles()
  const {
    id,
    name,
    entity,
    recipients,
    group,
    onDelete,
    // onSelect,
    isSelected,
    onRowClick,
  } = props

  return (
    <TableRow
      hover
      className={classes.row}
      onClick={event => onRowClick(event, id)}
      role="Checkbox"
      aria-checked={isSelected}
      tabIndex={-1}
      selected={isSelected}
    >
      <TableCell width="4%" padding="checkbox">
        {/* <Checkbox
          checked={isSelected}
          onClick={event => {
            event.stopPropagation()
            onSelect(event, id)
          }}
        /> */}
      </TableCell>
      <TableCell width="23%" align="left">
        {name}
      </TableCell>
      <TableCell width="23%" align="left">
        {entity}
      </TableCell>
      <TableCell width="23%" align="right">
        {recipients}
      </TableCell>
      <TableCell width="23%" align="right">
        {group}
      </TableCell>
      <TableCell width="4%" align="center" padding="checkbox">
        <IconButton
          onClick={event => {
            event.stopPropagation()
            onDelete(event, id)
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default ReportTableRow
