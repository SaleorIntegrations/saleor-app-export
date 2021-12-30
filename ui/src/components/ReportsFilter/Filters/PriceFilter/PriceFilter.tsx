import React, { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'
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
  TextField,
} from '@material-ui/core'
import {
  ExpandMore as ExpandMoreIcon,
  SubdirectoryArrowRight as SubdirectoryArrowRightIcon,
} from '@material-ui/icons'

import useStyles from '../styles'
import { Filter as FilterType, ReducerAction } from '../../FilterButton/reducer'

export interface PriceFilterProps {
  filter: FilterType
  dispatch: (action: ReducerAction) => void
}

export function ReleaseFilter(props: PriceFilterProps) {
  const classes = useStyles()
  const { filter, dispatch } = props
  const [type, setType] = useState('equal')
  const [fromPrice, setFromPrice] = useState('')
  const [toPrice, setToPrice] = useState<string>('')

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
    setFromPrice('')
    setToPrice('')
    setType(event.target.value as string)
  }

  const EqualQuery = (
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

  const BetweenQuery = (
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

  useEffect(() => {
    dispatch({
      type: 'SET_PRICE',
      id: filter.id,
      price: { to: toPrice ? toPrice : null, from: fromPrice },
    })
  }, [toPrice, fromPrice])

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
