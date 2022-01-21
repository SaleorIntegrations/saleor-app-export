import React from 'react'
import { Grid } from '@material-ui/core'
import { SubdirectoryArrowRight } from '@material-ui/icons'

import { DateField } from '../../../DateField'

import { QueryAction } from './types'

interface EqualQueryProps {
  toTime: string
  toDate: string
  setDateTime: (value: string, action: QueryAction) => void
}

export function EqualQuery(props: EqualQueryProps) {
  const { toTime, toDate, setDateTime } = props
  return (
    <Grid container direction="row" spacing={1} alignItems="center">
      <Grid item xs={1}>
        <SubdirectoryArrowRight />
      </Grid>
      <Grid item xs={11}>
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

export default EqualQuery
