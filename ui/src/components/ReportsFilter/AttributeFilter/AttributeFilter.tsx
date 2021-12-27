import React, { useState, useCallback } from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons'

import useStyles from './styles'
import { Filter } from '../FilterButton'
import { useSearchAttributeValuesQuery } from '../../../api/attributesValues'

export interface AttributeFilterProps {
  filter: Filter
  changeFilter: (filter: Filter) => void
}

export function AttributeFilter(props: AttributeFilterProps) {
  const classes = useStyles()
  const { filter, changeFilter } = props
  const [searchedAttributeValues, fetchSearchedAttributeValues] =
    useSearchAttributeValuesQuery(filter.id, '', 10, '', { pause: true })
  const [search, setSearch] = useState('')
  const attributeValues = searchedAttributeValues.data?.attribute.choices.edges

  const onMainCheckChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    changeFilter({ ...filter, checked: checked })
  }

  const onSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearch(event.target.value)
  }

  const onAccordionChange = (
    event: React.ChangeEvent<{}>,
    expanded: boolean
  ) => {
    if (expanded && !searchedAttributeValues.data) {
      fetchSearchedAttributeValues()
    }
  }

  const onOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  }

  const optionsFiltrBySearch = useCallback(() => {
    return attributeValues
      ?.filter(value =>
        value.node.slug.toLowerCase().includes(search.toLowerCase())
      )
      .map(({ node }) => (
        <FormControlLabel
          key={node.id}
          className={classes.checkOption}
          control={
            <Checkbox
              checked={filter.selected.includes(node.id)}
              value={node.id}
              onChange={onOptionChange}
            />
          }
          label={node.name}
        />
      ))
  }, [attributeValues, search, filter])

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
        <TextField
          className={classes.searchInput}
          value={search}
          onChange={onSearchChange}
        />
        {attributeValues && attributeValues?.length > 0 ? (
          optionsFiltrBySearch()
        ) : (
          <Typography>No results</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default AttributeFilter
