import React from 'react'
import { Box } from '@material-ui/core'

import { GeneralInformation } from '../../../setting/general/components/GeneralInformation'
import { OrderColumnsArea } from '../OrderColumnsArea'
import { useCommon } from '../../../common'

import useStyles from './styles'

export function OrderSetting() {
  const classes = useStyles()
  const [name, setName] = useCommon(state => [state.name, state.setName])

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
