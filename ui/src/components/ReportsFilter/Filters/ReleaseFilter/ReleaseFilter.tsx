import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { produce } from 'immer'
import dayjs from 'dayjs'
import {
  Accordion,
  AccordionSummary,
  FormControlLabel,
  Checkbox,
  AccordionDetails,
  Select,
  MenuItem,
} from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons'

import useStyles from '../styles'
import { Filter as FilterType, ReducerAction } from '../../FilterButton/reducer'
import { Format } from '../../../DateField'

import { QueryAction, DateQuery } from './types'
import BetweenQuery from './BetweenQuery'
import EqualQuery from './EqualQuery'

export interface ReleaseFilterProps {
  filter: FilterType
  dispatch: (action: ReducerAction) => void
}

export function ReleaseFilter(props: ReleaseFilterProps) {
  const classes = useStyles()
  const { filter, dispatch } = props
  const [type, setType] = useState('equal')
  const [query, setQuery] = useState<DateQuery>({
    to: {
      date: dayjs().format(Format.date),
      time: dayjs().format(Format.time),
    },
    from: {
      date: dayjs().format(Format.date),
      time: dayjs().format(Format.time),
    },
  })

  const setDateTime = (newDateTime: string, action: QueryAction) => {
    setQuery(
      produce(draft => {
        switch (action) {
          case QueryAction.setToDate:
            return (draft.to.date = newDateTime)
          case QueryAction.setToTime:
            return (draft.to.time = newDateTime)
          case QueryAction.setFromDate:
            return (draft.from.date = newDateTime)
          case QueryAction.setFromTime:
            return (draft.from.time = newDateTime)
          default:
            return draft
        }
      })
    )
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
    setQuery(
      produce(draft => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        draft = {
          to: {
            date: dayjs().format(Format.date),
            time: dayjs().format(Format.time),
          },
          from: {
            date: dayjs().format(Format.date),
            time: dayjs().format(Format.time),
          },
        }
      })
    )
    setType(event.target.value as string)
  }

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
        {type === 'equal' && (
          <EqualQuery
            toDate={query.to.date}
            toTime={query.to.time}
            setDateTime={setDateTime}
          />
        )}
        {type === 'between' && (
          <BetweenQuery
            toDate={query.to.date}
            toTime={query.to.time}
            setDateTime={setDateTime}
            fromDate={query.from.date}
            fromTime={query.from.time}
          />
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default ReleaseFilter
