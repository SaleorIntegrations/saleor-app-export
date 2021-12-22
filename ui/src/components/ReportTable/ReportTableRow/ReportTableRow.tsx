import React from 'react'
import { TableRow, TableCell, Checkbox, IconButton } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'

import useStyles from '../styles'

interface ReportTableRowProps {
  id: string
  name: string
  entity: string
  recipients: number
  onDelete: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void
  onSelect: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void
  onRowClick: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    id: string
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
    onDelete,
    onSelect,
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
      <TableCell padding="checkbox">
        <Checkbox checked={isSelected} onClick={event => onSelect(event, id)} />
      </TableCell>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="left">{entity}</TableCell>
      <TableCell align="right">{recipients}</TableCell>
      <TableCell align="center" padding="checkbox">
        <IconButton onClick={event => onDelete(event, id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default ReportTableRow
