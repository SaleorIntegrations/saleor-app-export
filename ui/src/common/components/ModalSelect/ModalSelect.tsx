import React, { useState } from 'react'
import { Box, Modal, Paper, Typography } from '@material-ui/core'
import { Edit as EditIcon } from '@material-ui/icons'

import useStyles from './styles'

export interface ModalSelectProps {
  title: string
  description?: string
  render: (setIsOpen: (newIsOpen: boolean) => void) => React.ReactElement
}

export function ModalSelect(props: ModalSelectProps) {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const { title, description, render } = props

  return (
    <Box>
      <Paper
        className={classes.editButton}
        elevation={0}
        variant="outlined"
        component="button"
        onClick={() => setIsOpen(true)}
      >
        <Box>
          <Typography className={classes.typography} variant="button">
            {title}
          </Typography>
          <Typography className={classes.typography} variant="caption">
            {description}
          </Typography>
        </Box>
        <EditIcon />
      </Paper>
      <Modal
        className={classes.modal}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {render(setIsOpen)}
      </Modal>
    </Box>
  )
}

export default ModalSelect
