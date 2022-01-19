import React from 'react'
import { Box } from '@material-ui/core'

import { GeneralInformation } from '../GeneralInformation'
import { ProductColumnsArea } from '../ProductColumnsArea/ProductColumnsArea'
import { useExportCommonStore } from '../../hooks'
import useStyles from './styles'

export function ProductSetting() {
  const classes = useStyles()
  const [name, setName] = useExportCommonStore(state => [
    state.name,
    state.setName,
  ])

  return (
    <Box className={classes.list}>
      <GeneralInformation
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <ProductColumnsArea
        title="Columns"
        subtitle="Define columns you want to export in your file"
      />
    </Box>
  )
}

export default ProductSetting
