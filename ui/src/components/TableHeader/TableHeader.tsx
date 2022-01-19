import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, Box } from '@material-ui/core'

import useStyles from './styles'

export function TableHeader() {
  const classes = useStyles()
  const navigate = useNavigate()

  const onClick = () => {
    navigate('/create/product', { replace: true })
  }

  return (
    <Box className={classes.header}>
      <Box>
        <Typography variant="h5">List of reports</Typography>
        <Typography>
          On this list you can see all created and scheduled exports
        </Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={onClick}>
        Create report
      </Button>
    </Box>
  )
}

export default TableHeader
