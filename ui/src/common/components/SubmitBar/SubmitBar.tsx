import React from 'react'
import { Paper, Button } from '@material-ui/core'

import useStyles from './styles'

interface SubmitBarProps {
  onSaveAndExport?: () => void
  onExport?: () => void
  onCancel?: () => void
  onSave?: () => void
}

export function SubmitBar(props: SubmitBarProps) {
  const { onSaveAndExport, onExport, onCancel, onSave } = props
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      {onCancel && (
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
      )}
      {onSave && (
        <Button onClick={onSave} variant="contained" color="primary">
          Save
        </Button>
      )}
      {onExport && (
        <Button onClick={onExport} variant="outlined" color="primary">
          Export
        </Button>
      )}
      {onSaveAndExport && (
        <Button onClick={onSaveAndExport} variant="contained" color="primary">
          Save & Export
        </Button>
      )}
    </Paper>
  )
}

export default SubmitBar
