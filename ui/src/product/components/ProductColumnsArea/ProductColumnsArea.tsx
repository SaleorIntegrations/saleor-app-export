import React from 'react'
import { Typography, Box } from '@material-ui/core'
import clsx from 'clsx'

import { Surface } from '../../../common/components'
import { AttributesEdit } from '../AttributesEdit'
import { ChannelsEdit } from '../ChannelsEdit'
import { InventoryEdit } from '../InventoryEdit'
import { ProductFieldEdit } from '../ProductFieldEdit'

import useStyles from './styles'

interface ProductColumnsAreaProps {
  title: string
  subtitle: string
}

export function ProductColumnsArea(props: ProductColumnsAreaProps) {
  const { title, subtitle } = props
  const classes = useStyles()

  return (
    <Surface padding={0}>
      <Box className={clsx(classes.paddingBox)}>
        <Box paddingBottom={2}>
          <Typography variant="h5">{title}</Typography>
          <Typography>{subtitle}</Typography>
        </Box>
        <Box className={classes.selectBox}>
          <ChannelsEdit />
          <ProductFieldEdit
            fieldKey="organisationFields"
            title="Product organsation"
            dialogTitle="Select Product Organization"
            dialogSubtitle="Select the product organizations you want to export information for"
          />
          <AttributesEdit />
          <ProductFieldEdit
            fieldKey="financialFields"
            title="Financial"
            dialogTitle="Select Financial Informations"
            dialogSubtitle="Select the financial informations you want to export information for"
          />
          <InventoryEdit />
          <ProductFieldEdit
            fieldKey="seoFields"
            title="SEO"
            dialogTitle="Select SEO Informations"
            dialogSubtitle="Select the SEO informations you want to export information for"
          />
        </Box>
      </Box>
    </Surface>
  )
}

export default ProductColumnsArea
