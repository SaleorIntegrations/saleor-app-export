import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
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

import { BetweenQuery } from './BetweenQuery'
import { EqualQuery } from './EqualQuery'

export interface PriceFilterProps {
  filter: FilterType
  dispatch: (action: ReducerAction) => void
}

export function PriceFilter(props: PriceFilterProps) {
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
        {type === 'equal' && (
          <EqualQuery fromPrice={fromPrice} setFromPrice={setFromPrice} />
        )}
        {type === 'between' && (
          <BetweenQuery
            fromPrice={fromPrice}
            setFromPrice={setFromPrice}
            setToPrice={setToPrice}
            toPrice={toPrice}
          />
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default PriceFilter
