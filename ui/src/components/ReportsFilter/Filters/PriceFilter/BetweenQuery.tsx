import React from 'react'
import clsx from 'clsx'
import { Grid, TextField, Typography } from '@material-ui/core'
import { SubdirectoryArrowRight as SubdirectoryArrowRightIcon } from '@material-ui/icons'

import useStyles from '../styles'

interface BetweenQueryProps {
  fromPrice: string
  toPrice: string
  setFromPrice: (fromPrice: string) => void
  setToPrice: (toPrice: string) => void
}

export function BetweenQuery(props: BetweenQueryProps) {
  const { fromPrice, setFromPrice, toPrice, setToPrice } = props
  const classes = useStyles()

  return (
    <Grid container direction="row" spacing={1}>
      <Grid item xs={1}>
        <SubdirectoryArrowRightIcon style={{ marginTop: '0.5rem' }} />
      </Grid>
      <Grid item xs={11}>
        <TextField
          type="number"
          className={clsx(classes.search, classes.searchInput)}
          value={fromPrice}
          onChange={event => setFromPrice(event.target.value)}
        />
        <Typography>and</Typography>
        <TextField
          type="number"
          className={clsx(classes.search, classes.searchInput)}
          value={toPrice}
          onChange={event => setToPrice(event.target.value)}
        />
      </Grid>
    </Grid>
  )
}

export default BetweenQuery
