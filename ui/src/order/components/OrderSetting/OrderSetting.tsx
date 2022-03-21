import React from 'react'
import { Box } from '@material-ui/core'

import { GeneralInformation } from '../../../setting/general/components/GeneralInformation'
import { OrderColumnsArea } from '../OrderColumnsArea'

import useStyles from './styles'

export function OrderSetting() {
  const classes = useStyles()

  return (
    <Box className={classes.list}>
      <GeneralInformation />
      <OrderColumnsArea
        title="Columns"
        subtitle="Define columns you want to export in your file"
      />
    </Box>
  )
}

export default OrderSetting
