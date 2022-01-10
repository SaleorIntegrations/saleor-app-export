import React from 'react'
import {
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core'

import Surface from '../Surface'
import Label from '../Label'
import { FileType } from '../../globalTypes'

interface ExportPickerProps {
  setFileType: (newFileType: FileType) => void
  fileType: FileType
}

export function ExportPicker(props: ExportPickerProps) {
  const { setFileType, fileType } = props

  const onChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setFileType(value as FileType)
  }

  return (
    <Surface>
      <Typography variant="h6">Settings</Typography>
      <Label>FILE EXPORTED</Label>
      <FormControl fullWidth variant="outlined">
        <RadioGroup onChange={onChange} value={fileType} name="export">
          <FormControlLabel
            value={FileType.XLSX}
            control={<Radio color="primary" />}
            label="Spreadsheet for Excel, Numbers etc."
          />
          <FormControlLabel
            value={FileType.CSV}
            control={<Radio color="primary" />}
            label="Plain CSV file"
          />
        </RadioGroup>
      </FormControl>
    </Surface>
  )
}

export default ExportPicker
