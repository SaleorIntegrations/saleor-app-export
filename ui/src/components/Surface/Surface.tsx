import React from 'react'
import { Paper } from '@material-ui/core'

import useStyles from './styles'

interface SurfaceProps {
  children: React.ReactNode
  padding?: number
}

export function Surface({ children, padding }: SurfaceProps) {
  const classes = useStyles(padding !== undefined ? padding : 3)

  return <Paper className={classes.root}>{children}</Paper>
}

export default Surface
