import React, { useCallback } from 'react'
import { FormControlLabel, Checkbox } from '@material-ui/core'

import InputComplexLabel from '../InputComplexLabel'
import { Option } from '../OptionsCheck'

interface CheckAllProps {
  title: string
  description: string
  isChecked: boolean
  setOptions: (options: Option[]) => void
  options: Option[]
}

export function CheckAll(props: CheckAllProps): JSX.Element | null {
  const { title, description, isChecked, setOptions, options } = props

  const onCheck = useCallback(() => {
    setOptions(options.map(option => ({ ...option, checked: !isChecked })))
  }, [isChecked])

  return (
    <FormControlLabel
      label={<InputComplexLabel main={title} sub={description} />}
      control={<Checkbox checked={isChecked} onClick={onCheck} />}
    />
  )
}

export default CheckAll
