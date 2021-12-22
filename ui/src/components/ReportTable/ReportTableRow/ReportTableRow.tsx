import React from 'react'
import { TableRow, TableCell, Checkbox, IconButton } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'


interface ReportTableRowProps {
  id: string
  name: string
  entity: string
  recipients: number
  onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onSelect: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
  isSelected: boolean
}

export function ReportTableRow(props: ReportTableRowProps) {
  const { id, name, entity, recipients, onDelete, onSelect, isSelected } = props

  return (
    <TableRow
      hover
      onClick={onSelect}
      role="Checkbox"
      aria-checked={isSelected}
      tabIndex={-1}
      selected={isSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={isSelected}
        />
      </TableCell>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="left">{entity}</TableCell>
      <TableCell align="right">{recipients}</TableCell>
      <TableCell align="center" padding="checkbox">
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default ReportTableRow
