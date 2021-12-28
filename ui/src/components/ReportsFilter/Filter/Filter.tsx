import React from 'react'
import {
  Accordion,
  AccordionSummary,
  FormControlLabel,
  Checkbox,
  AccordionDetails,
  Typography,
  Radio,
} from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons'

import useStyles from './styles'
import { Filter as FilterType } from '../FilterButton'

export interface Option {
  id: string
  name: string
}

export interface FilterProps {
  fetchFilterOptions: any
  filter: FilterType
  changeFilter: (filter: FilterType) => void
  searchInput: React.ReactNode
  filterOptions: Option[] | undefined
  type: 'checkbox' | 'radio'
}

export function Filter({
  fetchFilterOptions,
  filter,
  changeFilter,
  searchInput,
  filterOptions,
  type,
}: FilterProps) {
  const classes = useStyles()

  const onAccordionChange = (
    event: React.ChangeEvent<{}>,
    expanded: boolean
  ) => {
    if (expanded) {
      fetchFilterOptions()
    }
  }

  const onMainCheckChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    changeFilter({ ...filter, checked: checked })
  }

  const onFilterOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'checkbox') {
      if (filter.selected.includes(event.target.value)) {
        changeFilter({
          ...filter,
          selected: filter.selected.filter(
            select => select !== event.target.value
          ),
        })
      } else {
        changeFilter({
          ...filter,
          selected: [...filter.selected, event.target.value],
        })
      }
    } else {
      changeFilter({ ...filter, selected: [event.target.value] })
    }
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
              onChange={onFilterOptionChange}
            />
          ) : (
            <Radio
              color="primary"
              name={filter.name}
              checked={filter.selected.includes(id)}
              value={id}
              onChange={onFilterOptionChange}
            />
          )
        }
        label={name}
      />
    ))
  }

  return (
    <Accordion className={classes.accordion} onChange={onAccordionChange}>
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
          optionsFiltrBySearch()
        ) : (
          <Typography>No results</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default Filter
