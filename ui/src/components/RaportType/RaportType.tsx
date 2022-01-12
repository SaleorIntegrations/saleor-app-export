import React from 'react'
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography,
} from '@material-ui/core'

import Surface from '../Surface'
import Label from '../Label'
import { ExportObjectTypesEnum as RaportTypes } from '../../globalTypes'

export interface RaportTypeProps {
  isMutable?: boolean
  reportType?: RaportTypes
  onReportTypeChange?: (
    _event: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => void
}

export function RaportType({
  isMutable,
  reportType,
  onReportTypeChange,
}: RaportTypeProps) {
  const getReportTypeName = () => {
    switch (reportType) {
      case RaportTypes.ORDERS:
        return 'Orders'
      case RaportTypes.PRODUCTS:
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
          <MenuItem value={RaportTypes.PRODUCTS}>Products</MenuItem>
          <MenuItem value={RaportTypes.ORDERS}>Orders</MenuItem>
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

export default RaportType
