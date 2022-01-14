import React from 'react'
import { Box } from '@material-ui/core'

import { GeneralInformation } from '../GeneralInformation'
import { useProductExport } from '../../hooks'
import { ProductColumnsArea } from '../ProductColumnsArea/ProductColumnsArea'
import useStyles from './styles'

export function ProductSetting() {
  const classes = useStyles()
  const { exportData, name, setName } = useProductExport()

  if (!exportData) return <div>Loading...</div>

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
