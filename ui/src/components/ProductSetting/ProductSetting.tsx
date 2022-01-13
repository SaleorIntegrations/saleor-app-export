import React from 'react'
import { Box } from '@material-ui/core'

import { GeneralInformation } from '../GeneralInformation'
import { useProductExport } from '../../hooks'
import { ProductArea } from '../ProductColumnsArea'
import useStyles from './styles'

export function ProductSetting() {
  const classes = useStyles()
  const { exportData, setExportData } = useProductExport()

  if (!exportData) return <div>Loading...</div>

  return (
    <Box className={classes.list}>
      <GeneralInformation
        value={exportData.name}
        onChange={e => setExportData({ ...exportData, name: e.target.value })}
      />
      <ProductArea
        title="Columns"
        subtitle="Define columns you want to export in your file"
      />
    </Box>
  )
}

export default ProductSetting
