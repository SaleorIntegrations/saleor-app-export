import React from 'react'
import { Paper } from '@material-ui/core'

import useStyles from './styles'

interface SurfaceProps {
  children: React.ReactNode
  padding?: number
  variant?: 'elevation' | 'outlined'
  elevation?: number
}

export function Surface({
  children,
  padding,
  variant,
  elevation,
}: SurfaceProps) {
  const classes = useStyles(padding !== undefined ? padding : 3)

  return (
    <Paper variant={variant} elevation={elevation} className={classes.root}>
      {children}
    </Paper>
  )
}

export default Surface
