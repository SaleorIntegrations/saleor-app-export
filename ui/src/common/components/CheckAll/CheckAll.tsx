import React from 'react'
import { FormControlLabel, Checkbox } from '@material-ui/core'

import InputComplexLabel from '../InputComplexLabel'

interface CheckAllProps {
  title: string
  description: string
  isChecked: boolean
  onCheck: (isChecked: boolean) => void
  hide?: boolean
}

export function CheckAll(props: CheckAllProps): JSX.Element | null {
  const { title, description, isChecked, onCheck, hide } = props

  if (hide) return null

  return (
    <FormControlLabel
      label={<InputComplexLabel main={title} sub={description} />}
      control={
        <Checkbox checked={isChecked} onClick={() => onCheck(isChecked)} />
      }
    />
  )
}

export default CheckAll
