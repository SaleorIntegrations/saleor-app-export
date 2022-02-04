import React from 'react'
import { Chip } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

import { useStyles } from './styles'

interface PillProps {
  onClick?: () => void
  onDelete?: () => void
  label: string
}

export function Pill(props: PillProps) {
  const classes = useStyles()
  const { onClick, onDelete, label } = props

  return (
    <Chip
      onClick={onClick}
      className={classes.pill}
      deleteIcon={<CloseIcon />}
      color="primary"
      clickable={false}
      label={label}
      onDelete={onDelete}
    />
  )
}

export default Pill
