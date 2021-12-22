import React from 'react'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@saleor/macaw-ui'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '1.6rem 2.4rem 1.6rem 2.4rem',
    boxSizing: 'border-box',
    borderRadius: '6px 6px 0 0',
    textAlign: 'right',
    '& > *': {
      marginLeft: '1.2rem',
    },
  },
}))

export function Footer() {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Button variant="outlined">Save & Export</Button>
      <Button variant="contained" color="primary">
        Export
      </Button>
    </Paper>
  )
}

export default Footer
