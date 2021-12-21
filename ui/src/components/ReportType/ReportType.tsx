import React from 'react'
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography
} from '@material-ui/core'

import Surface from '../Surface'
import Label from '../Label'

export interface ReportTypeProps {
  isMutable?: boolean
  reportType?: string
}

export function ReportType({ isMutable, reportType }: ReportTypeProps) {
  return (
    isMutable ? (
      <Surface>
        <Label>REPORT TYPE</Label>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Report Type</InputLabel>
          <Select>
            <MenuItem value="aaa">aaa</MenuItem>
            <MenuItem value="bbb">bbb</MenuItem>
            <MenuItem value="ccc">ccc</MenuItem>
          </Select>
        </FormControl>
      </Surface>
    ) : (
      <Surface>
        <Label>REPORT TYPE</Label>
        <Typography variant="h6">{reportType}</Typography>
      </Surface>
    )
  )
}

export default ReportType
