import React from 'react'
import { FormControl, FormControlLabel, Checkbox } from '@material-ui/core'
import produce from 'immer'

import { useStyles } from './styles'

export interface Option {
  checked: boolean
  value: string
  name: string
}
interface OptionsCheckProps<T extends Option> {
  options: T[]
  setOptions: (options: T[]) => void
}

export function OptionsCheck<T extends Option>(
  props: OptionsCheckProps<T>
): JSX.Element {
  const { options, setOptions } = props
  const classes = useStyles()

  const onCheck = (option: Option) => {
    setOptions(
      produce(options, draft => {
        const index = draft.findIndex(attr => attr.value === option.value)
        draft[index].checked = !option.checked
      })
    )
  }

  return (
    <>
      {options.map(option => (
        <FormControl key={option.name} className={classes.checkSlot}>
          <FormControlLabel
            label={option.name}
            control={
              <Checkbox
                checked={option.checked}
                value={option.value}
                onChange={() => onCheck(option)}
              />
            }
          />
        </FormControl>
      ))}
    </>
  )
}

export default OptionsCheck
