import React from 'react'
import { Box, Checkbox, FormControl, FormControlLabel } from '@material-ui/core'
import produce from 'immer'

import ComplexLabel from '../InputComplexLabel'
import useStyles from './styles'

export interface CheckboxListOption {
  id: string
  name: string
  value: string
  checked: boolean
  slug?: string
}

interface CheckboxListProps {
  options: CheckboxListOption[]
  mainCheckboxTitle: string
  subCheckboxTitle?: string
  setOptions: (options: CheckboxListOption[]) => void
  offMultiCheck?: boolean
  filter?: (option: CheckboxListOption) => boolean
}

export function CheckboxList(props: CheckboxListProps) {
  const classes = useStyles()
  const {
    options,
    mainCheckboxTitle,
    subCheckboxTitle,
    setOptions,
    filter,
    offMultiCheck,
  } = props

  const filtredOptions = filter ? options.filter(filter) : options

  const onSubCheckboxChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setOptions(
      produce(options, draft => {
        const option = draft.find(
          option => option.value === _event.target.value
        )
        if (option) option.checked = checked
      })
    )
  }

  const onAllCheckboxChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setOptions(
      produce(options, draft => {
        draft.forEach(option => {
          option.checked = checked
        })
      })
    )
  }

  return (
    <Box>
      {!offMultiCheck && (
        <FormControlLabel
          label={
            <ComplexLabel main={mainCheckboxTitle} sub={subCheckboxTitle} />
          }
          control={
            <Checkbox
              checked={options.every(option => option.checked)}
              onChange={onAllCheckboxChange}
            />
          }
        />
      )}
      <Box>
        {filtredOptions.map(option => (
          <FormControl key={option.id} className={classes.checkSlot}>
            <FormControlLabel
              label={option.name}
              control={
                <Checkbox
                  checked={option.checked}
                  value={option.value}
                  onChange={onSubCheckboxChange}
                />
              }
            />
          </FormControl>
        ))}
      </Box>
    </Box>
  )
}

export default CheckboxList
