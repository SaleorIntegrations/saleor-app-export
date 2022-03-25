import React from 'react'
import { Dialog } from '@material-ui/core'

import { useStyles } from './styles'

interface BlurDialogProps {
  onClose: () => void
  open: boolean
  children: React.ReactNode
}

export function BlurDialog(props: BlurDialogProps): JSX.Element {
  const { onClose, open, children } = props
  const classes = useStyles()

  return (
    <Dialog className={classes.dialog} onClose={onClose} open={open}>
      {children}
    </Dialog>
  )
}

export default BlurDialog
