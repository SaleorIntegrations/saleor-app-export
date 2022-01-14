import React from 'react'
import { Box } from '@material-ui/core'

import { GeneralInformation } from '../GeneralInformation'
import { useOrderExport } from '../../hooks'

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
    </Box>
  )
}

export default OrderSetting
