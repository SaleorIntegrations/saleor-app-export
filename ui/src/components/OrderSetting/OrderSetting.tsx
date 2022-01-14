import React from 'react'
import { Box } from '@material-ui/core'

import { GeneralInformation } from '../GeneralInformation'
import { useOrderExport } from '../../hooks'
import { OrderColumnsArea } from '../OrderColumnsArea'

import useStyles from './styles'

export function OrderSetting() {
  const classes = useStyles()
  const { name, setName } = useOrderExport()

  return (
    <Box className={classes.list}>
      <GeneralInformation
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <OrderColumnsArea
        title="Columns"
        subtitle="Define columns you want to export in your file"
      />
    </Box>
  )
}

export default OrderSetting
