import React from 'react'
import { Paper, Typography, Box, Button } from '@material-ui/core'

import { useStyles } from './styles'

interface FieldEditPlatformProps {
  title: string
  subtitle: string
  search?: JSX.Element
  children?: React.ReactNode
  onExit: () => void
  onSubmit: () => void
}

export function FieldEditPlatform(props: FieldEditPlatformProps): JSX.Element {
  const { title, subtitle, onSubmit, search, onExit, children } = props
  const classes = useStyles()

  return (
    <Paper className={classes.platform}>
      <Typography variant="h5">{title}</Typography>
      <Typography>{subtitle}</Typography>
      <Box margin="1.2rem 0">{search}</Box>
      <Box className={classes.body}>{children}</Box>
      <Box className={classes.buttonGroup}>
        <Button variant="outlined" onClick={onExit}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={onSubmit}>
          Select
        </Button>
      </Box>
    </Paper>
  )
}

export default FieldEditPlatform
