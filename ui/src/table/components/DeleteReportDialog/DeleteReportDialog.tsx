import React, { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { DeleteIcon, IconButton } from '@saleor/macaw-ui'

import { useStyles } from './styles'

interface DeleteReportDialogProps {
  onDelete: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => void
  id: number
  name: string
}

export function DeleteReportDialog(
  props: DeleteReportDialogProps
): JSX.Element {
  const { onDelete, id, name } = props
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <IconButton
        variant="secondary"
        hoverOutline
        onClick={event => {
          event.stopPropagation()
          setIsOpen(true)
        }}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        className={classes.dialog}
        open={isOpen}
        onClick={e => e.stopPropagation()}
        onClose={() => setIsOpen(false)}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Box width="400px" maxWidth="400px">
            <DialogContentText>
              You will remove <b>{name}</b> report
            </DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setIsOpen(false)}
          >
            close
          </Button>
          <Button
            className={classes.deleteButton}
            color="primary"
            variant="outlined"
            onClick={event => onDelete(event, id)}
          >
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteReportDialog
