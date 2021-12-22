import React from 'react'
import { makeStyles } from '@saleor/macaw-ui'
import { FormLabel } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  formLabel: {
    display: 'block',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    fontSize: '0.8em',
  },
}))

interface LabelProps {
  children: React.ReactNode
}

export function Label({ children }: LabelProps) {
  const classes = useStyles()

  return <FormLabel className={classes.formLabel}>{children}</FormLabel>
}

export default Label
