import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { SubdirectoryArrowRight } from '@material-ui/icons'

import { DateField } from '../../../DateField'

import { QueryAction } from './types'

interface BetweenQueryProps {
  toTime: string
  toDate: string
  fromTime: string
  fromDate: string
  setDateTime: (value: string, action: QueryAction) => void
}

export function BetweenQuery(props: BetweenQueryProps) {
  const { toTime, toDate, setDateTime, fromTime, fromDate } = props
  return (
    <Grid container direction="row" spacing={1}>
      <Grid item xs={1}>
        <SubdirectoryArrowRight style={{ marginTop: '2rem' }} />
      </Grid>
      <Grid item xs={11}>
        <DateField
          time={fromTime}
          date={fromDate}
          setDate={value => setDateTime(value, QueryAction.setFromDate)}
          setTime={value => setDateTime(value, QueryAction.setFromTime)}
        />
        <Typography>and</Typography>
        <DateField
          time={toTime}
          date={toDate}
          setDate={value => setDateTime(value, QueryAction.setToDate)}
          setTime={value => setDateTime(value, QueryAction.setToTime)}
        />
      </Grid>
    </Grid>
  )
}

export default BetweenQuery
