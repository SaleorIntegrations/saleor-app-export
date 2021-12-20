import React from 'react'
import {
  Typography,
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@material-ui/core'
import { makeStyles } from '@saleor/macaw-ui'

import Surface from '../Surface'

const useStyles = makeStyles((theme) => ({
  formLabel: {
    display: 'block',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    fontSize: '0.8em',
  }
}))

export function ExportPicker() {
  const classes = useStyles()

  return (
    <Surface>
      <Typography variant="h6">Settings</Typography>
      <FormLabel className={classes.formLabel}>
        FILE EXPORTED
      </FormLabel>
      <FormControl fullWidth variant="outlined">
        <RadioGroup name="export">
          <FormControlLabel
            value="excel"
            control={<Radio />}
            label="Spreadsheet for Excel, Numbers etc."
          />
          <FormControlLabel
            value="csv"
            control={<Radio />}
            label="Plain CSV file"
          />
        </RadioGroup>
      </FormControl>
    </Surface>
  )
}

export default ExportPicker
