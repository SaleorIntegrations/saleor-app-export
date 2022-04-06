import React from 'react'
import { Typography, TextField } from '@material-ui/core'

import Surface from '../../../../common/components/Surface'
import { useCommon } from '../../../../common/hooks'

import useStyles from './styles'

export function GeneralInformation() {
  const [name, setName] = useCommon(state => [state.name, state.setName])
  const classes = useStyles()

  return (
    <Surface>
      <Typography variant="h6">General Information</Typography>
      <Typography className={classes.paragraph}>
        Naming your export will help you find it your address box and on a
        export list in app main view.
      </Typography>
      <TextField
        error={!name.isValid}
        value={name.value}
        helperText={!name.isValid ? 'Field is required' : undefined}
        onChange={_event =>
          setName({ value: _event.target.value, isValid: true })
        }
        fullWidth
        label="Report name"
      />
    </Surface>
  )
}

export default GeneralInformation
