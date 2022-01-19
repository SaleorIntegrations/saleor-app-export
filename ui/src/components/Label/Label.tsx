import React from 'react'
import { FormLabel } from '@material-ui/core'

import useStyles from './styles'

interface LabelProps {
  children: React.ReactNode
}

export function Label({ children }: LabelProps) {
  const classes = useStyles()

  return <FormLabel className={classes.formLabel}>{children}</FormLabel>
}

export default Label
