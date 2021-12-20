import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { makeStyles } from '@saleor/macaw-ui'

const useStyles = makeStyles((theme) => ({
  list: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2)
    }
  }
}))

export interface ContentProps {
  settings: React.ReactNode,
  options: React.ReactNode
}

export function Content({ settings, options }: ContentProps) {
  const classes = useStyles()

  return (
    <Grid
      container
      direction="row-reverse"
      justifyContent="space-between"
      alignItems="flex-start"
      spacing={4}
    >
      <Grid item md={4}>
        <Box className={classes.list}>
          {settings}
        </Box>
      </Grid>
      <Grid item md={8}>
        <Box className={classes.list}>
          {options}
        </Box>
      </Grid>
    </Grid>
  )
}

export default Content
