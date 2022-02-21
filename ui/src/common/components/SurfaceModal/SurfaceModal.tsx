import React from 'react'
import { Box, Button, Modal } from '@material-ui/core'

import Surface from '../Surface'

import { useStyles } from './styles'

interface SurfaceModalProps {
  children: React.ReactNode
  isOpen: boolean
  onSave: () => void
  onClose: () => void
}

export function SurfaceModal(props: SurfaceModalProps) {
  const { children, isOpen, onSave, onClose } = props
  const classes = useStyles()

  return (
    <Modal className={classes.modal} open={isOpen} onClose={onClose}>
      <Box className={classes.surface}>
        <Surface>
          {children}
          <Box className={classes.buttonBox}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button color="primary" variant="contained" onClick={onSave}>
              Select
            </Button>
          </Box>
        </Surface>
      </Box>
    </Modal>
  )
}

export default SurfaceModal
