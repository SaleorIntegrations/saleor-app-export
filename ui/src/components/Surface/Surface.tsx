import React from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@saleor/macaw-ui'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))

interface SurfaceProps {
  children: React.ReactNode
}

export function Surface({ children }: SurfaceProps) {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      {children}
    </Paper>
  )
}

export default Surface
