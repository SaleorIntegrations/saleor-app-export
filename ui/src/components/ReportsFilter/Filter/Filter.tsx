import React from 'react'
import {
  Accordion,
  AccordionSummary,
  FormControlLabel,
  Checkbox,
  AccordionDetails,
  Typography,
  Radio,
  Link,
} from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons'

import useStyles from './styles'
import { Filter as FilterType, ReducerAction } from '../FilterButton/reducer'

export interface Option {
  id: string
  name: string
}

export interface FilterProps {
  filter: FilterType
  dispatch: (action: ReducerAction) => void
  searchInput?: React.ReactNode
  filterOptions: Option[] | undefined
  type: 'checkbox' | 'radio'
  hasNext: boolean
  setCanFetch: (value: boolean) => void
  loadMore: () => void
}

export function Filter({
  filter,
  dispatch,
  searchInput,
  filterOptions,
  type,
  hasNext,
  setCanFetch,
  loadMore,
}: FilterProps) {
  const classes = useStyles()

  const onMainCheckChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    dispatch({ type: 'CHANGE_FILTER', filter: { ...filter, checked: checked } })
  }

  const onCheckboxFilterOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation()
    if (filter.selected.includes(event.target.value)) {
      dispatch({
        type: 'ADD_SELECTED',
        id: filter.id,
        selected: filter.selected.filter(
          select => select !== event.target.value
        ),
      })
    } else {
      dispatch({
        type: 'ADD_SELECTED',
        id: filter.id,
        selected: [...filter.selected, event.target.value],
      })
    }
  }

  const onRadioFilterOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation()
    dispatch({ type: 'ADD_SELECTED', selected: [event.target.value] })
  }

  const optionsFiltrBySearch = () => {
    return filterOptions?.map(({ id, name }) => (
      <FormControlLabel
        key={id}
        className={classes.checkOption}
        control={
          type === 'checkbox' ? (
            <Checkbox
              checked={filter.selected.includes(id)}
              value={id}
              onChange={onCheckboxFilterOptionChange}
            />
          ) : (
            <Radio
              color="primary"
              name={filter.name}
              checked={filter.selected.includes(id)}
              value={id}
              onChange={onRadioFilterOptionChange}
            />
          )
        }
        label={name}
      />
    ))
  }

  return (
    <Accordion className={classes.accordion} onChange={() => setCanFetch(true)}>
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
        {searchInput}
        {filterOptions && filterOptions.length > 0 ? (
          <>
            {optionsFiltrBySearch()}
            {hasNext && (
              <Link
                className={classes.linkButton}
                type="button"
                color="primary"
                onClick={loadMore}
              >
                Show more
              </Link>
            )}
          </>
        ) : (
          <Typography>No results</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default Filter
