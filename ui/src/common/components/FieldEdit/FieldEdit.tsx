import React from 'react'
import { Box, Paper, Typography } from '@material-ui/core'
import { Edit as EditIcon } from '@material-ui/icons'

import useStyles from './styles'

export interface FieldEditProps {
  setIsOpen: (isOpen: boolean) => void
  title: string
  description?: string
}

export function FieldEdit(props: FieldEditProps) {
  const { title, description, setIsOpen } = props
  const classes = useStyles()

  return (
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
  )
}

export default FieldEdit
