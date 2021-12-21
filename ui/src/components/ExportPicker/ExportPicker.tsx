import React from 'react'
import {
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@material-ui/core'

import Surface from '../Surface'
import Label from '../Label'

export function ExportPicker() {
  return (
    <Surface>
      <Typography variant="h6">Settings</Typography>
      <Label>FILE EXPORTED</Label>
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
