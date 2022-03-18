import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import { produce } from 'immer'

import { Surface } from '../../../common/components/Surface'
import { ModalSelect } from '../../../common/components/ModalSelect'
import { BaseFieldSettingModal } from '../../../common/components/ModalSetting'
import { useOrder } from '../../../common'
import { OrderFieldEnum } from '../../../common/api/export/types'
import { sortOrderFields } from '../../utils'

import useStyles from './styles'
import { getFields } from './fields'

interface OrderColumnsAreaProps {
  title: string
  subtitle: string
}

export function OrderColumnsArea(props: OrderColumnsAreaProps) {
  const classes = useStyles()
  const { title, subtitle } = props
  const { columns, setOrderFields } = useOrder()
  const [fields, setFields] = useState(sortOrderFields(columns.orderFields))

  useEffect(() => {
    setOrderFields(Object.values(fields).flat())
  }, [fields])

  return (
    <Surface padding={3}>
      <Box paddingBottom={2}>
        <Typography variant="h5">{title}</Typography>
        <Typography>{subtitle}</Typography>
      </Box>
      <Box className={classes.selectBox}>
        <ModalSelect
          title="Basic"
          description={
            fields.basic.length ? `selected ${fields.basic.length}` : undefined
          }
          render={setIsOpen => (
            <BaseFieldSettingModal
              fields={fields.basic}
              setFields={newBasic =>
                setFields(
                  produce(draft => {
                    draft.basic = newBasic as OrderFieldEnum[]
                  })
                )
              }
              setIsOpen={setIsOpen}
              title="Select Basic Informations"
              subtitle="Select the order basic informations you want to export information for"
              fieldOptions={getFields(fields.basic, 'basic')}
            />
          )}
        />
        <ModalSelect
          title="Financial"
          description={
            fields.financial.length
              ? `selected ${fields.financial.length}`
              : undefined
          }
          render={setIsOpen => (
            <BaseFieldSettingModal
              fields={fields.financial}
              setFields={newFinancial =>
                setFields(
                  produce(draft => {
                    draft.financial = newFinancial as OrderFieldEnum[]
                  })
                )
              }
              setIsOpen={setIsOpen}
              title="Select Financial Informations"
              subtitle="Select the order financial informations you want to export information for"
              fieldOptions={getFields(fields.financial, 'financial')}
            />
          )}
        />
        <ModalSelect
          title="Customer"
          description={
            fields.customer.length
              ? `selected ${fields.customer.length}`
              : undefined
          }
          render={setIsOpen => (
            <BaseFieldSettingModal
              fields={fields.customer}
              setFields={newCustomer =>
                setFields(
                  produce(draft => {
                    draft.customer = newCustomer as OrderFieldEnum[]
                  })
                )
              }
              setIsOpen={setIsOpen}
              title="Select Customer Informations"
              subtitle="Select the order customer you want to export information for"
              fieldOptions={getFields(fields.customer, 'customer')}
            />
          )}
        />
        <ModalSelect
          title="Items"
          description={
            fields.items.length ? `selected ${fields.items.length}` : undefined
          }
          render={setIsOpen => (
            <BaseFieldSettingModal
              fields={fields.items}
              setFields={newItems =>
                setFields(
                  produce(draft => {
                    draft.items = newItems as OrderFieldEnum[]
                  })
                )
              }
              setIsOpen={setIsOpen}
              title="Select Items Informations"
              subtitle="Select the order items you want to export information for"
              fieldOptions={getFields(fields.items, 'items')}
            />
          )}
        />
        <ModalSelect
          title="Payments"
          description={
            fields.payments.length
              ? `selected ${fields.payments.length}`
              : undefined
          }
          render={setIsOpen => (
            <BaseFieldSettingModal
              fields={fields.payments}
              setFields={newPayments =>
                setFields(
                  produce(draft => {
                    draft.payments = newPayments as OrderFieldEnum[]
                  })
                )
              }
              setIsOpen={setIsOpen}
              title="Select Payments Informations"
              subtitle="Select the order payments informations you want to export information for"
              fieldOptions={getFields(fields.payments, 'payments')}
            />
          )}
        />
        <ModalSelect
          title="Fulfillments"
          description={
            fields.fulfillments.length
              ? `selected ${fields.fulfillments.length}`
              : undefined
          }
          render={setIsOpen => (
            <BaseFieldSettingModal
              fields={fields.fulfillments}
              setFields={newFulfillments =>
                setFields(
                  produce(draft => {
                    draft.fulfillments = newFulfillments as OrderFieldEnum[]
                  })
                )
              }
              setIsOpen={setIsOpen}
              title="Select Fulfillments Informations"
              subtitle="Select the order fulfillments informations you want to export information for"
              fieldOptions={getFields(fields.fulfillments, 'fulfillments')}
            />
          )}
        />
      </Box>
    </Surface>
  )
}

export default OrderColumnsArea
