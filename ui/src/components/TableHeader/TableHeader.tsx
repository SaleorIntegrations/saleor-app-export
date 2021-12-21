import React from 'react'
import { Button, Typography, Box } from '@material-ui/core'

import useStyles from './styles';

export function TableHeader() {
  const classes = useStyles()

  return (
    <Box className={classes.header}>
      <Box>
        <Typography variant="h5">List of reports</Typography>
        <Typography>On this list you can see all created and scheduled exports</Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => alert('CREATE NEW RAPORT')}
      >
        Create report
      </Button>
    </Box>
  )
}

export default TableHeader
