import React from 'react'
import { withStyles } from '@material-ui/core'
import { ToggleButton } from '@material-ui/lab'

export const ZoneToggle = withStyles({
  selected: {
    backgroundColor: '#06847B !important',
    color: '#FFFFFF !important',
  }
})(ToggleButton)

export default ZoneToggle
