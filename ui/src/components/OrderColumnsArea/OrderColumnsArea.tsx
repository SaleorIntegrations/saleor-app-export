import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { produce } from 'immer'

import { Surface } from '../Surface'
import { ModalSelect } from '../ModalSelect'
import { BaseFieldSettingModal } from '../ModalSetting'
import { OrderField } from '../../globalTypes'
import { useOrderExport } from '../../hooks/useOrderExport'

import useStyles from './styles'
import { getFields } from './fields'

interface OrderColumnsAreaProps {
  title: string
  subtitle: string
}

export function OrderColumnsArea(props: OrderColumnsAreaProps) {
  const classes = useStyles()
  const { title, subtitle } = props
  const { exportData, setExportData } = useOrderExport()

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
            exportData.exportInfo.fields.basic.length
              ? `selected ${exportData.exportInfo.fields.basic.length}`
              : undefined
          }
          render={setIsOpen => (
            <BaseFieldSettingModal
              fields={exportData.exportInfo.fields.basic}
              setFields={newBasic =>
                setExportData(
                  produce(exportData, draft => {
                    draft.exportInfo.fields.basic = newBasic as OrderField[]
                  })
                )
              }
              setIsOpen={setIsOpen}
              title="Select Basic Informations"
              subtitle="Select the order basic informations you want to export information for"
              fieldOptions={getFields(
                exportData.exportInfo.fields.basic,
                'basic'
              )}
            />
          )}
        />
        <ModalSelect
          title="Financial"
          description={
            exportData.exportInfo.fields.financial.length
              ? `selected ${exportData.exportInfo.fields.financial.length}`
              : undefined
          }
          render={setIsOpen => (
            <BaseFieldSettingModal
              fields={exportData.exportInfo.fields.financial}
              setFields={newFinancial =>
                setExportData(
                  produce(exportData, draft => {
                    draft.exportInfo.fields.financial =
                      newFinancial as OrderField[]
                  })
                )
              }
              setIsOpen={setIsOpen}
              title="Select Financial Informations"
              subtitle="Select the order financial informations you want to export information for"
              fieldOptions={getFields(
                exportData.exportInfo.fields.financial,
                'financial'
              )}
            />
          )}
        />
        <ModalSelect
          title="Customer"
          description={
            exportData.exportInfo.fields.customer.length
              ? `selected ${exportData.exportInfo.fields.customer.length}`
              : undefined
          }
          render={setIsOpen => (
            <BaseFieldSettingModal
              fields={exportData.exportInfo.fields.customer}
              setFields={newCustomer =>
                setExportData(
                  produce(exportData, draft => {
                    draft.exportInfo.fields.customer =
                      newCustomer as OrderField[]
                  })
                )
              }
              setIsOpen={setIsOpen}
              title="Select Customer Informations"
              subtitle="Select the order customer you want to export information for"
              fieldOptions={getFields(
                exportData.exportInfo.fields.customer,
                'customer'
              )}
            />
          )}
        />
        <ModalSelect
          title="Items"
          description={
            exportData.exportInfo.fields.items.length
              ? `selected ${exportData.exportInfo.fields.items.length}`
              : undefined
          }
          render={setIsOpen => (
            <BaseFieldSettingModal
              fields={exportData.exportInfo.fields.items}
              setFields={newItems =>
                setExportData(
                  produce(exportData, draft => {
                    draft.exportInfo.fields.items = newItems as OrderField[]
                  })
                )
              }
              setIsOpen={setIsOpen}
              title="Select Items Informations"
              subtitle="Select the order items you want to export information for"
              fieldOptions={getFields(
                exportData.exportInfo.fields.items,
                'items'
              )}
            />
          )}
        />
        <ModalSelect
          title="Payments"
          description={
            exportData.exportInfo.fields.payments.length
              ? `selected ${exportData.exportInfo.fields.payments.length}`
              : undefined
          }
          render={setIsOpen => (
            <BaseFieldSettingModal
              fields={exportData.exportInfo.fields.payments}
              setFields={newPayments =>
                setExportData(
                  produce(exportData, draft => {
                    draft.exportInfo.fields.payments =
                      newPayments as OrderField[]
                  })
                )
              }
              setIsOpen={setIsOpen}
              title="Select Payments Informations"
              subtitle="Select the order payments informations you want to export information for"
              fieldOptions={getFields(
                exportData.exportInfo.fields.payments,
                'payments'
              )}
            />
          )}
        />
        <ModalSelect
          title="Fulfillments"
          description={
            exportData.exportInfo.fields.fulfillments.length
              ? `selected ${exportData.exportInfo.fields.fulfillments.length}`
              : undefined
          }
          render={setIsOpen => (
            <BaseFieldSettingModal
              fields={exportData.exportInfo.fields.fulfillments}
              setFields={newFulfillments =>
                setExportData(
                  produce(exportData, draft => {
                    draft.exportInfo.fields.fulfillments =
                      newFulfillments as OrderField[]
                  })
                )
              }
              setIsOpen={setIsOpen}
              title="Select Fulfillments Informations"
              subtitle="Select the order fulfillments informations you want to export information for"
              fieldOptions={getFields(
                exportData.exportInfo.fields.fulfillments,
                'fulfillments'
              )}
            />
          )}
        />
      </Box>
    </Surface>
  )
}

export default OrderColumnsArea
