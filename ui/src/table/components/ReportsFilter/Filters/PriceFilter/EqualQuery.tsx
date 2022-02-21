import React from 'react'
import clsx from 'clsx'
import { Grid, TextField } from '@material-ui/core'
import { SubdirectoryArrowRight as SubdirectoryArrowRightIcon } from '@material-ui/icons'

import useStyles from '../styles'

interface EqualQueryProps {
  fromPrice: string
  setFromPrice: (fromPrice: string) => void
}

export function EqualQuery(props: EqualQueryProps) {
  const { fromPrice, setFromPrice } = props
  const classes = useStyles()

  return (
    <Grid container direction="row" spacing={1} alignItems="center">
      <Grid item xs={1}>
        <SubdirectoryArrowRightIcon />
      </Grid>
      <Grid item xs={11}>
        <TextField
          type="number"
          className={clsx(classes.search, classes.searchInput)}
          value={fromPrice}
          onChange={event => setFromPrice(event.target.value)}
        />
      </Grid>
    </Grid>
  )
}

export default EqualQuery
