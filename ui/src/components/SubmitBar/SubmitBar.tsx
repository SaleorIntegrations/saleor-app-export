import React from 'react'
import { Paper, Button } from '@material-ui/core'

import useStyles from './styles'

interface SubmitBarProps {
  onSaveAndExport: () => void
  onExport: () => void
}

export function SubmitBar(props: SubmitBarProps) {
  const { onSaveAndExport, onExport } = props
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Button onClick={onSaveAndExport} variant="outlined">
        Save & Export
      </Button>
      <Button onClick={onExport} variant="contained" color="primary">
        Export
      </Button>
    </Paper>
  )
}

export default SubmitBar
