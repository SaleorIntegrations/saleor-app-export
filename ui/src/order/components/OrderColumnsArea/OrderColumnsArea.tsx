import React from 'react'
import { Box, Typography } from '@material-ui/core'

import { Surface } from '../../../common/components'
import OrderFieldEdit from '../OrderFieldEdit'

import useStyles from './styles'

interface OrderColumnsAreaProps {
  title: string
  subtitle: string
}

export function OrderColumnsArea(props: OrderColumnsAreaProps) {
  const classes = useStyles()
  const { title, subtitle } = props

  return (
    <Surface padding={3}>
      <Box paddingBottom={2}>
        <Typography variant="h5">{title}</Typography>
        <Typography>{subtitle}</Typography>
      </Box>
      <Box className={classes.selectBox}>
        <OrderFieldEdit
          title="Basic"
          dialogTitle="Select Basic Informations"
          dialogSubtitle="Select the order basic informations you want to export information for"
          fieldKey="basicFields"
        />
        <OrderFieldEdit
          title="Financial"
          dialogTitle="Select Financial Informations"
          dialogSubtitle="Select the order financial informations you want to export information for"
          fieldKey="financialFields"
        />
        <OrderFieldEdit
          title="Customer"
          dialogTitle="Select Customer Informations"
          dialogSubtitle="Select the order customer you want to export information for"
          fieldKey="customerFields"
        />
        <OrderFieldEdit
          title="Items"
          dialogTitle="Select Items Informations"
          dialogSubtitle="Select the order items you want to export information for"
          fieldKey="itemsFields"
        />
        <OrderFieldEdit
          title="Payments"
          dialogTitle="Select Payments Informations"
          dialogSubtitle="Select the order payments informations you want to export information for"
          fieldKey="paymentFields"
        />
        <OrderFieldEdit
          title="Fulfillments"
          dialogTitle="Select Fulfillments Informations"
          dialogSubtitle="Select the order fulfillments informations you want to export information for"
          fieldKey="fulfillmentsFields"
        />
      </Box>
    </Surface>
  )
}

export default OrderColumnsArea
