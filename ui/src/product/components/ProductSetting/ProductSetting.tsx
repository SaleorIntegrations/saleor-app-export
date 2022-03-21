import React from 'react'
import { Box } from '@material-ui/core'

import { GeneralInformation } from '../../../setting/general/components/GeneralInformation'
import { ProductColumnsArea } from '../ProductColumnsArea/ProductColumnsArea'

import useStyles from './styles'

export function ProductSetting() {
  const classes = useStyles()

  return (
    <Box className={classes.list}>
      <GeneralInformation />
      <ProductColumnsArea
        title="Columns"
        subtitle="Define columns you want to export in your file"
      />
    </Box>
  )
}

export default ProductSetting
