import React from 'react'
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography,
} from '@material-ui/core'

import Surface from '../../../../common/components/Surface'
import Label from '../../../../common/components/Label'
import { ExportObjectTypesEnum } from '../../../../common/api/export/types'

export interface ReportTypeProps {
  isMutable?: boolean
  reportType?: ExportObjectTypesEnum
  onReportTypeChange?: (
    _event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => void
}

export function ReportType({
  isMutable,
  reportType,
  onReportTypeChange,
}: ReportTypeProps) {
  const getReportTypeName = () => {
    switch (reportType) {
      case ExportObjectTypesEnum.ORDERS:
        return 'Orders'
      case ExportObjectTypesEnum.PRODUCTS:
        return 'Products'
      default:
        return 'Products'
    }
  }

  return isMutable ? (
    <Surface>
      <Label>REPORT TYPE</Label>
      <FormControl fullWidth variant="outlined">
        <InputLabel>Report Type</InputLabel>
        <Select onChange={onReportTypeChange} value={reportType}>
          <MenuItem value={ExportObjectTypesEnum.PRODUCTS}>Products</MenuItem>
          <MenuItem value={ExportObjectTypesEnum.ORDERS}>Orders</MenuItem>
        </Select>
      </FormControl>
    </Surface>
  ) : (
    <Surface>
      <Label>REPORT TYPE</Label>
      <Typography variant="h6">{getReportTypeName()}</Typography>
    </Surface>
  )
}

export default ReportType
