/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'
import moment from 'moment'
import {
  Accordion,
  AccordionSummary,
  FormControlLabel,
  Checkbox,
  AccordionDetails,
  Select,
  MenuItem,
  Grid,
  Typography,
} from '@material-ui/core'
import {
  ExpandMore as ExpandMoreIcon,
  SubdirectoryArrowRight as SubdirectoryArrowRightIcon,
} from '@material-ui/icons'

import useStyles from '../styles'
import {
  Filter as FilterType,
  ReducerAction,
  DateTime,
} from '../../FilterButton/reducer'
import { DateField, Format } from '../../../DateField'

export interface ReleaseFilterProps {
  filter: FilterType
  dispatch: (action: ReducerAction) => void
}

interface DateQuery {
  to: DateTime
  from: DateTime
}

enum QueryAction {
  setToTime = 'SET_TO_TIME',
  setToDate = 'SET_TO_DATE',
  setFromTime = 'SET_FROM_TIME',
  setFromDate = 'SET_FROM_DATE',
  clear = 'CLEAR',
}

export function ReleaseFilter(props: ReleaseFilterProps) {
  const classes = useStyles()
  const { filter, dispatch } = props
  const [type, setType] = useState('equal')
  const [query, setQuery] = useState<DateQuery>({
    to: {
      date: moment().format(Format.date),
      time: moment().format(Format.time),
    },
    from: {
      date: moment().format(Format.date),
      time: moment().format(Format.time),
    },
  })

  const getNewQuery = useCallback(
    (action: QueryAction, newDateTime: string = '') => {
      switch (action) {
        case QueryAction.setToDate:
          return { from: query.from, to: { ...query.to, date: newDateTime } }
        case QueryAction.setToTime:
          return { from: query.from, to: { ...query.to, time: newDateTime } }
        case QueryAction.setFromDate:
          return { to: query.to, from: { ...query.from, date: newDateTime } }
        case QueryAction.setFromTime:
          return { to: query.to, from: { ...query.from, time: newDateTime } }
        case QueryAction.clear:
          return {
            to: {
              date: moment().format(Format.date),
              time: moment().format(Format.time),
            },
            from: {
              date: moment().format(Format.date),
              time: moment().format(Format.time),
            },
          }
        default:
          return query
      }
    },
    [query]
  )

  const onDateTimeChange = (newDateTime: string, action: QueryAction) => {
    setQuery(getNewQuery(action, newDateTime))
  }

  const onMainCheckChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    dispatch({ type: 'CHANGE_FILTER', filter: { ...filter, checked: checked } })
  }

  const onSelectChange = (
    event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    setQuery(getNewQuery(QueryAction.clear))
    setType(event.target.value as string)
  }

  const EqualQuery = (
    <Grid container direction="row" spacing={1} alignItems="center">
      <Grid item xs={1}>
        <SubdirectoryArrowRightIcon />
      </Grid>
      <Grid item xs={11}>
        <DateField
          time={query.to.time}
          date={query.to.date}
          setDate={value => onDateTimeChange(value, QueryAction.setToDate)}
          setTime={value => onDateTimeChange(value, QueryAction.setToTime)}
        />
      </Grid>
    </Grid>
  )

  const BetweenQuery = (
    <Grid container direction="row" spacing={1}>
      <Grid item xs={1}>
        <SubdirectoryArrowRightIcon style={{ marginTop: '2rem' }} />
      </Grid>
      <Grid item xs={11}>
        <DateField
          time={query.from.time}
          date={query.from.date}
          setDate={value => onDateTimeChange(value, QueryAction.setFromDate)}
          setTime={value => onDateTimeChange(value, QueryAction.setFromTime)}
        />
        <Typography>and</Typography>
        <DateField
          time={query.to.time}
          date={query.to.date}
          setDate={value => onDateTimeChange(value, QueryAction.setToDate)}
          setTime={value => onDateTimeChange(value, QueryAction.setToTime)}
        />
      </Grid>
    </Grid>
  )

  useEffect(() => {
    if (type === 'equal') {
      dispatch({ type: 'SET_PERIOD', id: filter.id, period: query.to })
    } else {
      dispatch({ type: 'SET_PERIOD', id: filter.id, period: query })
    }
  }, [query])

  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary
        className={classes.summary}
        expandIcon={<ExpandMoreIcon />}
        id={`${filter.id}-filter`}
      >
        <FormControlLabel
          control={
            <Checkbox onChange={onMainCheckChange} checked={filter.checked} />
          }
          label={filter.name}
        />
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <Select
          className={clsx(classes.search, classes.searchInput)}
          variant="outlined"
          value={type}
          onChange={onSelectChange}
        >
          <MenuItem value="equal">equal to</MenuItem>
          <MenuItem value="between">between</MenuItem>
        </Select>
        {type === 'equal' && EqualQuery}
        {type === 'between' && BetweenQuery}
      </AccordionDetails>
    </Accordion>
  )
}

export default ReleaseFilter
