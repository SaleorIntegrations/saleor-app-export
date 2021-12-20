import React from 'react'
import {
  FormControl,
  FormLabel,
  Select,
  InputLabel,
  MenuItem,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@saleor/macaw-ui'

import Surface from '../Surface'

const useStyles = makeStyles((theme) => ({
  formLabel: {
    display: 'block',
    marginBottom: theme.spacing(1),
    fontSize: '0.8em',
  }
}))

export interface ReportTypeProps {
  isMutable?: boolean
  reportType?: string
}

export function ReportType({ isMutable, reportType }: ReportTypeProps) {
  const classes = useStyles()

  return (
    isMutable ? (
      <Surface>
        <FormLabel className={classes.formLabel}>
          REPORT TYPE
        </FormLabel>
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
        <FormLabel color="secondary" className={classes.formLabel}>
          REPORT TYPE
        </FormLabel>
        <Typography variant="h6">{reportType}</Typography>
      </Surface>
    )
  )
}

export default ReportType
