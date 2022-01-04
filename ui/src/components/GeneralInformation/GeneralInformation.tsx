import React from 'react'
import { Typography, TextField } from '@material-ui/core'

import Surface from '../Surface'
import useStyles from './styles'

export interface GeneralInformationProps {
  value: string
  onChange: (
    _event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
}

export function GeneralInformation(props: GeneralInformationProps) {
  const { value, onChange } = props
  const classes = useStyles()

  return (
    <Surface>
      <Typography variant="h6">General Information</Typography>
      <Typography className={classes.paragraph}>
        Naming your export will help you find it your address box and on a
        export list in app main view.
      </Typography>
      <TextField
        value={value}
        onChange={onChange}
        fullWidth
        label="Report name"
      />
    </Surface>
  )
}

export default GeneralInformation
