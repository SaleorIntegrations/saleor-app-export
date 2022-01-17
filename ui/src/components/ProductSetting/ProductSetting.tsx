import React from 'react'
import { Box } from '@material-ui/core'

import { GeneralInformation } from '../GeneralInformation'
import { useExportProduct } from '../../hooks'
import { ProductColumnsArea } from '../ProductColumnsArea/ProductColumnsArea'
import useStyles from './styles'

export function ProductSetting() {
  const classes = useStyles()
  const { name, setName, isLoading } = useExportProduct()

  if (isLoading) return <div>Loading...</div>

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
