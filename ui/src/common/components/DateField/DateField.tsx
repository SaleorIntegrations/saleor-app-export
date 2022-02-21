import React from 'react'
import { TextField, Box } from '@material-ui/core'

import dayjs from '../../../utils/date'

import useStyles from './style'

interface DateFieldProps {
  setDate: (newDate: string) => void
  setTime: (newTime: string) => void
  time: string
  date: string
  defaultTime?: Date
  defaultDate?: Date
}

export enum Format {
  time = 'HH:mm',
  date = 'YYYY-MM-D',
}

export function DateField(props: DateFieldProps) {
  const { setDate, setTime, date, time, defaultDate, defaultTime } = props
  const classes = useStyles()

  return (
    <Box className={classes.dateBox}>
      <TextField
        className={classes.date}
        type="date"
        label="Date"
        value={date}
        defaultValue={dayjs(defaultDate).format(Format.date)}
        onChange={e =>
          setDate(dayjs(e.currentTarget.value).format(Format.date))
        }
      />
      <TextField
        className={classes.time}
        type="time"
        label="Time"
        value={time}
        defaultValue={dayjs(defaultTime).format(Format.time)}
        onChange={e => {
          setTime(e.currentTarget.value)
        }}
      />
    </Box>
  )
}

export default DateField
